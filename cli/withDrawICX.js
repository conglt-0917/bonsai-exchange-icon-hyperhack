const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const {
  IconWallet,
  HttpProvider,
  SignedTransaction,
  IconBuilder,
  IconConverter,
  IconAmount,
} = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallTransactionBuilder } = IconBuilder;

const wallet = IconWallet.loadPrivateKey(process.env.PRIVATE_KEY);
const owner = process.env.OWNER;
const oxygenInstance = process.env.ADDRESS_CONTRACT_OXYGEN;
let value = parseInt(argv.value);

async function withDrawICX() {
  try {
    value = IconAmount.of(value, IconAmount.Unit.ICX).toLoop();
    const txObj = new CallTransactionBuilder()
      .from(owner)
      .to(oxygenInstance)
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('ownerWithDraw')
      .params({
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

withDrawICX();
