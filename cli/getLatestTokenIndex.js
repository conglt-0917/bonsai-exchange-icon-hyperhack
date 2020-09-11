const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { HttpProvider, IconBuilder } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallBuilder } = IconBuilder;

const owner = process.env.OWNER;
const bonsaiInstance = process.env.ADDRESS_CONTRACT_BONSAI;

async function getBalance() {
  try {
    const txObj = new CallBuilder()
      .from(owner)
      .to(bonsaiInstance)
      .method('getLatestTokenIndex')
      .build();

    let result = await iconService.call(txObj).execute();
    result = parseInt(result);
    console.log({ result });
    return result;
  } catch (err) {
    console.log({ err });
  }
}

getBalance();
