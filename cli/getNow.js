const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { HttpProvider, IconBuilder } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallBuilder } = IconBuilder;

const owner = process.env.OWNER;
const oxygenInstance = process.env.ADDRESS_CONTRACT_OXYGEN;

async function getNow() {
  try {
    const txObj = new CallBuilder().from(owner).to(oxygenInstance).method('getNow').build();

    let now = await iconService.call(txObj).execute();
    now = parseInt(now);
    console.log({ now });
    return now;
  } catch (err) {
    console.log({ err });
  }
}

getNow();
