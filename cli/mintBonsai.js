const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { IconWallet, HttpProvider, SignedTransaction, IconBuilder, IconConverter } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallTransactionBuilder } = IconBuilder;

const wallet = IconWallet.loadPrivateKey(process.env.PRIVATE_KEY);
const owner = process.env.OWNER;
const bonsaiInstance = process.env.ADDRESS_CONTRACT_BONSAI;
let to = owner;
let price = 1;

if (argv.to) {
  to = argv.to;
}

if (argv.price) {
  price = parseInt(argv.price);
}

const tokenName = argv.name;

async function mintToken() {
  try {
    const txObj = new CallTransactionBuilder()
      .from(owner)
      .to(bonsaiInstance)
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('mint')
      .params({
        _to: to,
        _price: IconConverter.toHex(price),
        _tokenName: tokenName,
      })
      .build();

    const signedTransaction = new SignedTransaction(txObj, wallet);
    const txHash = await iconService.sendTransaction(signedTransaction).execute();

    console.log({ txHash });
  } catch (err) {
    console.log({ err });
  }
}

mintToken();
