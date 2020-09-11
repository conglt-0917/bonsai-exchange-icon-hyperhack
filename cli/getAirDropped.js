const IconService = require('icon-sdk-js');
require('dotenv').config();
const { HttpProvider, IconBuilder } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallBuilder } = IconBuilder;

const owner = process.env.OWNER;
const oxygenInstance = process.env.ADDRESS_CONTRACT_OXYGEN;

async function getAirDrop() {
  try {
    const txObj = new CallBuilder().from(owner).to(oxygenInstance).method('getAirDrop').build();

    let result = await iconService.call(txObj).execute();

    console.log({ result });
    return result;
  } catch (err) {
    console.log({ err });
  }
}

getAirDrop();
