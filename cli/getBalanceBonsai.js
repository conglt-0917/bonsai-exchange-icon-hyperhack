const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { HttpProvider, IconBuilder } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallBuilder } = IconBuilder;

const owner = process.env.OWNER;
const bonsaiInstance = process.env.ADDRESS_CONTRACT_BONSAI;
let account = owner;

if (argv.address) {
  account = argv.address;
}

async function getBalance() {
  try {
    const txObj = new CallBuilder()
      .from(owner)
      .to(bonsaiInstance)
      .method('balanceOf')
      .params({
        _owner: account,
      })
      .build();

    let balance = await iconService.call(txObj).execute();
    balance = parseInt(balance);
    console.log({ balance });
    return balance;
  } catch (err) {
    console.log({ err });
  }
}

getBalance();
