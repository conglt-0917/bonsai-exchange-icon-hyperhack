const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { HttpProvider, IconBuilder } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallBuilder } = IconBuilder;

const owner = process.env.OWNER;
const oxygenInstance = process.env.ADDRESS_CONTRACT_OXYGEN;

async function getScopeTime() {
  try {
    const txObj = new CallBuilder().from(owner).to(oxygenInstance).method('getScopeTime').build();

    let scopeTime = await iconService.call(txObj).execute();
    scopeTime = parseInt(scopeTime);
    console.log({ scopeTime });
    return scopeTime;
  } catch (err) {
    console.log({ err });
  }
}

getScopeTime();
