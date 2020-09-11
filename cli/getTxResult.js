const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { HttpProvider } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const txHash = argv.txhash;

async function getTxResult() {
  try {
    const txObject = await iconService.getTransactionResult(txHash).execute();
    console.log(txObject);
  } catch (err) {
    console.log({ err });
  }
}

getTxResult();
