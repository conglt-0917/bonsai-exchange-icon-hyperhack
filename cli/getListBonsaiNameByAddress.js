const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { HttpProvider, IconBuilder } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallBuilder } = IconBuilder;

const owner = process.env.OWNER;
const bonsaiInstance = process.env.ADDRESS_CONTRACT_BONSAI;
const address = argv.address;

async function getAllBonsaiOfToken() {
  try {
    const txObj = new CallBuilder()
      .from(owner)
      .to(bonsaiInstance)
      .method('getListBonsaiNameByAddress')
      .params({
        _address: address
      })
      .build();

    let result = await iconService.call(txObj).execute();
    // result = result.map((x) => parseInt(x));
    console.log({ result });
    return result;
  } catch (err) {
    console.log({ err });
  }
}

getAllBonsaiOfToken();
