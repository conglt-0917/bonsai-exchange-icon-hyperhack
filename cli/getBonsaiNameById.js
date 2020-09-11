const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { HttpProvider, IconBuilder, IconConverter } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallBuilder } = IconBuilder;

const owner = process.env.OWNER;
const bonsaiInstance = process.env.ADDRESS_CONTRACT_BONSAI;
const tokenId = argv.tokenid;

async function getTokenNameById() {
  try {
    const txObj = new CallBuilder()
      .from(owner)
      .to(bonsaiInstance)
      .method('getNameById')
      .params({
        _tokenId: IconConverter.toHex(tokenId),
      })
      .build();
    const name = await iconService.call(txObj).execute();

    console.log({ name });
    return name;
  } catch (err) {
    console.log({ err });
  }
}

getTokenNameById();
