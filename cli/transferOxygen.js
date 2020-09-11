const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { IconWallet, HttpProvider, SignedTransaction, IconBuilder, IconConverter } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallTransactionBuilder } = IconBuilder;

const wallet = IconWallet.loadPrivateKey(process.env.PRIVATE_KEY);
const owner = process.env.OWNER;
const oxygenInstance = process.env.ADDRESS_CONTRACT_OXYGEN;
const to = argv.to;
const value = parseInt(argv.value);

async function transfer() {
  try {
    const txObj = new CallTransactionBuilder()
      .from(owner)
      .to(oxygenInstance)
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('transfer')
      .params({
        _to: to,
        _value: IconConverter.toHex(value),
      })
      .build();

    const signedTransaction = new SignedTransaction(txObj, wallet);
    const txHash = await iconService.sendTransaction(signedTransaction).execute();

    console.log({ txHash });
  } catch (err) {
    console.log({ err });
  }
}

transfer();
