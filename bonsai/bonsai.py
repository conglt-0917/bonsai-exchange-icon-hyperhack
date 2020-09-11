from iconservice import *

TAG = 'BonSai'


class TokenStandard:
    @abstractmethod
    def name(self) -> str:
        pass

    @abstractmethod
    def symbol(self) -> str:
        pass

    @abstractmethod
    def balanceOf(self, _owner: Address) -> int:
        pass

    @abstractmethod
    def ownerOf(self, _tokenId: int) -> Address:
        pass

    @abstractmethod
    def getApproved(self, _tokenId: int) -> Address:
        pass

    @abstractmethod
    def approve(self, _to: Address, _tokenId: int):
        pass

    @abstractmethod
    def transfer(self, _to: Address, _tokenId: int):
        pass

    @abstractmethod
    def transferFrom(self, _from: Address, _to: Address, _tokenId: int):
        pass


class BonSai(IconScoreBase, TokenStandard):
    # Track token count against token owners
    _OWNED_TOKEN_COUNT = 'owned_token_count'
    _TOKEN_INDEX_COUNT = 'token_index_count'  # increment
    _TOKEN_OWNER = 'token_owner'  # Track token owner against token ID
    # Track token approved owner against token ID
    _TOKEN_APPROVALS = 'token_approvals'
    _TOKEN_PRICE = 'token_price'
    _TOKEN_NAME = 'token_name'
    _PLANT_DICT = 'plant_dict'

    _ZERO_ADDRESS = Address.from_prefix_and_int(AddressPrefix.EOA, 0)

    def __init__(self, db: IconScoreDatabase) -> None:
        super().__init__(db)
        self._ownedTokenCount = DictDB(
            self._OWNED_TOKEN_COUNT, db, value_type=int)
        self._tokenIndexCount = VarDB(
            self._TOKEN_INDEX_COUNT, db, value_type=int)
        self._tokenOwner = DictDB(self._TOKEN_OWNER, db, value_type=Address)
        self._tokenApprovals = DictDB(
            self._TOKEN_APPROVALS, db, value_type=Address)
        self._tokenPrice = DictDB(self._TOKEN_PRICE, db, value_type=int)
        self._tokenName = DictDB(self._TOKEN_NAME, db, value_type=str)
        self._plantDict = DictDB(self._PLANT_DICT, db, value_type=str)

    def on_install(self) -> None:
        super().on_install()

    def on_update(self) -> None:
        super().on_update()

    @external(readonly=True)
    def name(self) -> str:
        return "BonSai"

    @external(readonly=True)
    def symbol(self) -> str:
        return "BS"

    @external(readonly=True)
    def getNameById(self, _tokenId: int) -> str:
        return self._tokenName[_tokenId]

    @external(readonly=True)
    def balanceOf(self, _owner: Address) -> int:
        if _owner is None or self._is_zero_address(_owner):
            revert("Invalid owner")
        return self._ownedTokenCount[_owner]

    @external(readonly=True)
    def getLatestTokenIndex(self) -> int:
        return self._tokenIndexCount.get()

    @external(readonly=True)
    def getPlantDict(self, _address: Address) -> str:
        return self._plantDict[_address]

    @external
    def setPlantDict(self, _plants: str, _address: Address):
        if self.msg.sender != self.owner:
            revert("Permission Denied")
        self._plantDict[_address] = _plants

    def getListBonsai(self, _address: Address) -> list:
        bonsais = []
        numberOfBonsais = self._tokenIndexCount.get()

        for tokenId in range(1, numberOfBonsais + 1):
            if self._tokenOwner[tokenId] == _address:
                bonsais.append(tokenId)
        return bonsais

    @external(readonly=True)
    def getListBonsaiNameByAddress(self, _address: Address) -> list:
        bonsais = []
        numberOfBonsais = self._tokenIndexCount.get()

        for tokenId in range(1, numberOfBonsais + 1):
            if self._tokenOwner[tokenId] == _address:
                # bonsais.append(tokenId)
                bonsais.append(self._tokenName[tokenId])
        return bonsais

    @external(readonly=True)
    def getAllBonsaiOfUser(self, _address: Address) -> list:
        return self.getListBonsai(_address)

    @external(readonly=True)
    def getMyBonsais(self) -> list:
        return self.getListBonsai(self.msg.sender)

    @external(readonly=True)
    def ownerOf(self, _tokenId: int) -> Address:
        self._ensure_positive(_tokenId)
        owner = self._tokenOwner[_tokenId]
        if owner is None:
            revert("Invalid _tokenId. NFT is not minted")
        if self._is_zero_address(owner):
            revert("Invalid _tokenId. NFT is burned")

        return owner

    @external(readonly=True)
    def getApproved(self, _tokenId: int) -> Address:
        self.ownerOf(_tokenId)  # ensure valid token
        addr = self._tokenApprovals[_tokenId]
        if addr is None:
            return self._ZERO_ADDRESS
        return addr

    @external
    def approve(self, _to: Address, _tokenId: int):
        owner = self.ownerOf(_tokenId)
        if _to == owner:
            revert("Can't approve to yourself.")
        if self.msg.sender != owner:
            revert("You do not own this NFT")

        self._tokenApprovals[_tokenId] = _to
        self.Approval(owner, _to, _tokenId)

    @external
    def transfer(self, _to: Address, _tokenId: int):
        if self.ownerOf(_tokenId) != self.msg.sender:
            revert("You don't have permission to transfer this NFT")
        self._transfer(self.msg.sender, _to, _tokenId)

    @external
    def transferFrom(self, _from: Address, _to: Address, _tokenId: int):
        if self.ownerOf(_tokenId) != self.msg.sender and \
                self._tokenApprovals[_tokenId] != self.msg.sender:
            revert("You don't have permission to transfer this NFT")
        self._transfer(_from, _to, _tokenId)

    def _transfer(self, _from: Address, _to: Address, _tokenId: int):
        if _to is None or self._is_zero_address(_to):
            revert("You can't transfer to a zero address")

        _price = self._tokenPrice[_tokenId]
        _name = self._tokenName[_tokenId]

        self._clear_approval(_tokenId)
        self._remove_tokens_from(_from, _tokenId)
        self._add_tokens_to(_to, _tokenId, _price, _name)
        self.Transfer(_from, _to, _tokenId, _price, _name)
        Logger.debug(
            f'Transfer({_from}, {_to}, {_tokenId}, {_price}, {_name} TAG)')

    @external
    @payable
    def createBonsai(self, _tokenName: str):
        _price = self.msg.value
        _tokenId = self._tokenIndexCount.get()
        _tokenId += 1

        if _price <= 0 or _price > 100 * 10 ** 18:
            Logger.info(f'Price {_price} out of range.', TAG)
            revert(f'Price {_price} out of range.')

        self._add_tokens_to(self.msg.sender, _tokenId, _price, _tokenName)
        self._tokenIndexCount.set(_tokenId)
        self.Transfer(self._ZERO_ADDRESS, self.msg.sender,
                      _tokenId, _price, _tokenName)

    @external
    def mint(self, _to: Address, _price: int, _tokenName: str):
        # Mint a new NFT token
        _tokenId = self._tokenIndexCount.get()
        _tokenId += 1

        if self.msg.sender != self.owner:
            revert("You don't have permission to mint NFT")
        if _tokenId in self._tokenOwner:
            revert("Token already exists")
        self._add_tokens_to(_to, _tokenId, _price, _tokenName)
        self._tokenIndexCount.set(_tokenId)
        self.Transfer(self._ZERO_ADDRESS, _to, _tokenId, _price, _tokenName)

    @external
    def burn(self, _tokenId: int):
        # Burn NFT token
        if self.ownerOf(_tokenId) != self.msg.sender:
            revert("You dont have permission to burn this NFT")
        self._burn(self.msg.sender, _tokenId)

    def _burn(self, _owner: Address, _tokenId: int):
        _price = self._tokenPrice[_tokenId]
        _name = self._tokenName[_tokenId]
        self._clear_approval(_tokenId)
        self._remove_tokens_from(_owner, _tokenId)
        self.Transfer(_owner, self._ZERO_ADDRESS, _tokenId, _price, _name)

    def _is_zero_address(self, _address: Address) -> bool:
        # Check if address is zero address
        if _address == self._ZERO_ADDRESS:
            return True
        return False

    def _ensure_positive(self, _tokenId: int):
        if _tokenId is None or _tokenId < 0:
            revert("tokenId should be positive")

    def _clear_approval(self, _tokenId: int):
        # Delete token's approved operator
        if _tokenId in self._tokenApprovals:
            del self._tokenApprovals[_tokenId]

    def _remove_tokens_from(self, _from: Address, _tokenId: int):
        # Remove token ownership and subtract owner's token count by 1
        # Must ensure owner's permission before calling this function
        self._ownedTokenCount[_from] -= 1
        self._tokenOwner[_tokenId] = self._ZERO_ADDRESS

    def _add_tokens_to(self, _to: Address, _tokenId: int, _price: int, _tokenName: str):
        self._tokenOwner[_tokenId] = _to
        self._ownedTokenCount[_to] += 1
        self._tokenPrice[_tokenId] = _price
        self._tokenName[_tokenId] = _tokenName

    @eventlog(indexed=3)
    def Approval(self, _owner: Address, _approved: Address, _tokenId: int):
        pass

    @eventlog(indexed=3)
    def Transfer(self, _from: Address, _to: Address, _tokenId: int, _price: int, _tokenName: str):
        pass
