const IconService = require('icon-sdk-js');
require('dotenv').config();
const { HttpProvider, IconBuilder } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallBuilder } = IconBuilder;

const owner = process.env.OWNER;
const oxygenInstance = process.env.ADDRESS_CONTRACT_OXYGEN;

async function getLastTimeReceive() {
  try {
    const txObj = new CallBuilder()
      .from(owner)
      .to(oxygenInstance)
      .method('getLastTimeReceive')
      .build();

    let time = await iconService.call(txObj).execute();
    time = parseInt(time);
    console.log({ time });
    return time;
  } catch (err) {
    console.log({ err });
  }
}

getLastTimeReceive();
