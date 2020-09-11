const IconService = require('icon-sdk-js');
const { argv } = require('yargs');
require('dotenv').config();
const { IconWallet, HttpProvider, SignedTransaction, IconBuilder, IconConverter } = IconService;
const provider = new HttpProvider(process.env.API_ENPOINT);
const iconService = new IconService(provider);
const { CallTransactionBuilder } = IconBuilder;

const wallet = IconWallet.loadPrivateKey(process.env.PRIVATE_KEY);
const owner = process.env.OWNER;
const bonsaiInstance = process.env.ADDRESS_CONTRACT_BONSAI;
const address = argv.address;

async function setPlantDict() {
  try {
    const PLANT_STATUS = {
      PLANTED: 1,
      INSTOCK: 2,
      INSTORE: 3,
    };

    let plantsInitDic = {
      'Flamingo': {
        id: null,
        name: 'Flamingo',
        level: 2,
        price: 3000,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/flamingoflower5_background.png',
      },
      'Forget Menot': {
        id: null,
        name: 'Forget Menot',
        level: 2,
        price: 3000,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/forgetmenot5_background.png',
      },
      'Lily': {
        id: null,
        name: 'Lily',
        level: 2,
        price: 3049,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/lilyoftheincas5_background.png',
      },
      'Crocus': {
        id: null,
        name: 'Crocus',
        level: 2,
        price: 3099,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/crocus4_background.png',
      },
      'Peony': {
        id: null,
        name: 'Peony',
        level: 2,
        price: 3299,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/peonies5_background.png',
      },

      'Japan Maple': {
        id: null,
        name: 'Japan Maple',
        level: 2,
        price: 3699,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/japanesemaplebonsai5_background.png',
      },
      'Chamomile': {
        id: null,
        name: 'Chamomile',
        level: 2,
        price: 3999,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: 'images/chamomile5_background.png',
      },
      'Carnation': {
        id: null,
        name: 'Carnation',
        level: 3,
        price: 4090,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/carnation5_background.png',
      },
      'Chinese Lantern': {
        id: null,
        name: 'Chinese Lantern',
        level: 3,
        price: 4399,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/chineselantern4_background.png',
      },
      'Bell Pepper': {
        id: null,
        name: 'Bell Pepper',
        level: 2,
        price: 4499,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/bellpeppers5_background.png',
      },
      'Amaryllis': {
        id: null,
        name: 'Amaryllis',
        level: 2,
        price: 4999,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: 'images/amaryllis5_background.png',
      },
      'Cherry Blossom': {
        id: null,
        name: 'Cherry Blossom',
        level: 2,
        price: 5499,
        plantStatus: PLANT_STATUS.INSTORE,
        plantImg: '/images/cherryblossombonsai4_background.png',
      },
    };

    plantsInitDic = JSON.stringify(plantsInitDic);
    const txObj = new CallTransactionBuilder()
      .from(owner)
      .to(bonsaiInstance)
      .stepLimit(IconConverter.toBigNumber('2000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
      .version(IconConverter.toBigNumber('3'))
      .timestamp(new Date().getTime() * 1000)
      .method('setPlantDict')
      .params({
        _plants: plantsInitDic,
        _address: address,
      })
      .build();

    const signedTransaction = new SignedTransaction(txObj, wallet);
    const txHash = await iconService.sendTransaction(signedTransaction).execute();

    console.log({ txHash });
  } catch (err) {
    console.log({ err });
  }
}

setPlantDict();
