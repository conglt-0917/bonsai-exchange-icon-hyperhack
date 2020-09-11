const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { HttpProvider, IconBuilder } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallBuilder } = IconBuilder;

const owner = process.env.OWNER;
const oxygenInstance = process.env.ADDRESS_CONTRACT_OXYGEN;

async function getOxygenReceive() {
  try {
    const txObj = new CallBuilder()
      .from(owner)
      .to(oxygenInstance)
      .method('getOxygenReceive')
      .build();

    let amount = await iconService.call(txObj).execute();
    amount = parseInt(amount);
    console.log({ amount });
    return amount;
  } catch (err) {
    console.log({ err });
  }
}

getOxygenReceive();
