import * as connect from './actions';

const initialState = {
  active: false,
  connected: false,
  account: null,
  purses: [],
  plants: [],
  test: [],
  walletAddress: null,
  balanceICX: null,
  balanceOxy: null,
  tourStep: 0,
  balanceBonsai: [],
  firstPlant: null, // for trigger transfer plant posotion
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case connect.SERVER_CONNECTED:
      return {
        ...state,
        connected: action.connected,
      };
    case connect.ACTIVATE_CONNECTION:
      return {
        ...state,
        active: action.active,
      };
    case connect.CHANGE_PLANT_STATUS:
      return {
        ...state,
        plants: action.plants,
      };
    case connect.SET_ADDRESS:
      return {
        ...state,
        walletAddress: action.walletAddress,
      };
    case connect.GET_BALANCE_ICX:
      return {
        ...state,
        balanceICX: action.balanceICX,
      };
    case connect.GET_BALANCE_OXY:
      return {
        ...state,
        balanceOxy: action.balanceOxy,
      };
    case connect.GET_BALANCE_BONSAI:
      return {
        ...state,
        plants: action.plants,
        balanceBonsai: action.balanceBonsai,
      };
    case connect.UPDATE_TOUR_STEP:
      return {
        ...state,
        tourStep: action.tourStep,
      };
    case connect.SET_FIRST_PLANT:
      return {
        ...state,
        firstPlant: action.firstPlant,
      };
    case connect.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default rootReducer;
