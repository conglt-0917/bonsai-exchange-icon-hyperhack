import {
  convertHexToDec,
  getBalanceIcon,
  getBalanceBonsaiIcon,
  getBalanceOxyIcon,
  mintBonsaiFrom,
  sleep,
  getPlantDict,
  setPlantDict,
  isTxSuccess,
} from 'helpers';
import { PLANT_STATUS, plantsInitDic } from 'constant';

export const SERVER_CONNECTED = 'SERVER_CONNECTED';
export const serverConnected = (connected) => async (dispatch) => {
  dispatch({
    type: SERVER_CONNECTED,
    connected,
  });
};

export const ACTIVATE_CONNECTION = 'ACTIVATE_CONNECTION';
export const activateConnection = (active) => async (dispatch) => {
  dispatch({
    type: ACTIVATE_CONNECTION,
    active,
  });
};

export const CHANGE_PLANT_STATUS = 'CHANGE_PLANT_STATUS';
export const changePlantStatus = (id, status) => (dispatch, getState) => {
  let state = getState();

  let plants = state.plants;
  plants[id].plantStatus = status;
  dispatch({
    type: CHANGE_PLANT_STATUS,
    plants,
  });
};

export const RESET_ALL = 'RESET_ALL';
export const resetAll = () => (dispatch) => {
  dispatch({
    type: RESET_ALL,
  });
};

export const GET_BALANCE_ICX = 'GET_BALANCE_ICX';
export const getBalanceICX = (address) => async (dispatch) => {
  const balanceICX = convertHexToDec(await getBalanceIcon(address));
  dispatch({
    type: GET_BALANCE_ICX,
    balanceICX,
  });
};

export const GET_BALANCE_OXY = 'GET_BALANCE_OXY';
export const getBalanceOxy = () => async (dispatch, getState) => {
  let state = getState();
  let address = state.walletAddress;
  var amount = await getBalanceOxyIcon(address);
  if (amount === -1) {
    amount = 'Try again!';
  }
  dispatch({
    type: GET_BALANCE_OXY,
    balanceOxy: amount,
  });
};

export const SET_ADDRESS = 'SET_ADDRESS';
export const setAddress = (walletAddress) => (dispatch) => {
  localStorage.setItem('address', walletAddress);
  dispatch({
    type: SET_ADDRESS,
    walletAddress,
  });
};

export const GET_BALANCE_BONSAI = 'GET_BALANCE_BONSAI';
export const getBalanceBonsai = () => async (dispatch, getState) => {
  let state = getState();
  let address = state.walletAddress;
  const balanceBonsai = await getBalanceBonsaiIcon(address); //[bonsainames[], bonsaiIds[]]

  let plants = await getPlantDict(address);
  // if this is first time plants in contract is undefined
  if (plants === undefined) {
    plants = JSON.parse(JSON.stringify(plantsInitDic));
    plants = Object.values(plants);
  }
  // if not error
  if (balanceBonsai && balanceBonsai !== -1) {
    balanceBonsai[0].forEach((name, index) => {
      var x;
      // if not found plant.name in plants index return -1
      if ((x = plants.findIndex((plant) => plant.name === name)) !== -1) {
        plants[x].plantStatus = PLANT_STATUS.PLANTED;
        plants[x].id = balanceBonsai[1][index];
      }
    });
  } else {
    alert('Try again!');
  }

  plants = Object.values(plants);
  plants.map((plant, index) => (plant.index = index));

  dispatch({
    type: GET_BALANCE_BONSAI,
    plants,
    balanceBonsai: balanceBonsai[0],
  });
};

export const UPDATE_TOUR_STEP = 'UPDATE_TOUR_STEP';
export const updateTourStep = (tourStep) => (dispatch) => {
  dispatch({
    type: UPDATE_TOUR_STEP,
    tourStep,
  });
};

export const SET_FIRST_PLANT = 'SET_FIRST_PLANT';
export const setFirstPlant = (firstPlant) => (dispatch) => {
  dispatch({
    type: SET_FIRST_PLANT,
    firstPlant,
  });
};

export const transferPlantLocation = (secondPlant) => async (dispatch, getState) => {
  let state = getState();

  let firstPlant = state.firstPlant;
  let plants = state.plants;
  let address = state.walletAddress;
  // transfer
  let temp = plants[firstPlant];
  plants[firstPlant] = plants[secondPlant];
  plants[secondPlant] = temp;

  // update index
  plants.map((plant, index) => (plant.index = index));
  await setPlantDict(plants, address);

  dispatch({
    type: CHANGE_PLANT_STATUS,
    plants,
  });
};

export const mintBonsai = (bonsai) => async (dispatch, getState) => {
  let state = getState();
  let address = state.walletAddress;

  mintBonsaiFrom(address, bonsai);
  await sleep(5000);

  dispatch(getBalanceBonsai());
};

export const SET_LOADING = 'SET_LOADING';
export const setLoading = (loading) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    loading,
  });
};

export const removePlant = (id) => async (dispatch, getState) => {
  let state = getState();
  let plants = state.plants;
  let address = state.walletAddress;
  const x = plants.findIndex((plant) => plant.id === id);

  plants[x].id = null;
  plants[x].plantStatus = PLANT_STATUS.INSTORE;

  const txHash = await setPlantDict(plants, address);
  const isSuccess = await isTxSuccess(txHash);
  if (isSuccess) dispatch(getBalanceBonsai());
};
