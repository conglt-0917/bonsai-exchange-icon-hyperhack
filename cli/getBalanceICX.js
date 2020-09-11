const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { HttpProvider, IconBuilder } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);

const owner = process.env.OWNER;
const address = argv.address;

async function getBalance() {
  try {
    let balance = await iconService.getBalance(address).execute();
    balance = parseInt(balance);
    balance = balance / 1000000000000000000;
    console.log({ balance });
    return balance;
  } catch (err) {
    console.log({ err });
  }
}

getBalance();
