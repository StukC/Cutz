import constants from "../constants";
const initialState = {
  authState: {},
};

const authReducers = (state = initialState, actions) => {
  switch (actions.type) {
    case constants.LOGIN: {
      let LoginState = { ...state, authState: actions.payload };
      return LoginState;
    }
    case constants.LOGIN: {
      let LoginState = { ...state, authState:{} };
      return LoginState;
    }
    default:
      return state;
  }
};

export default authReducers;
