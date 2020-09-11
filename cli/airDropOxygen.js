const IconService = require('icon-sdk-js');
require('dotenv').config();
const { argv } = require('yargs');
const { IconWallet, HttpProvider, SignedTransaction, IconBuilder, IconConverter } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallTransactionBuilder } = IconBuilder;

const wallet = IconWallet.loadPrivateKey(process.env.PRIVATE_KEY);
const owner = process.env.OWNER;
const oxygenInstance = process.env.ADDRESS_CONTRACT_OXYGEN;

const address = argv.address;

async function airDrop() {
  try {
    const txObj = new CallTransactionBuilder()
      .from(owner)
      .to(oxygenInstance)
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('airDrop')
      .params({
        _address: address,
      })
      .build();

    const signedTransaction = new SignedTransaction(txObj, wallet);
    const txHash = await iconService.sendTransaction(signedTransaction).execute();
    console.log(txHash);
  } catch (err) {
    console.log({ err });
  }
}

airDrop();
