import axios from "axios";

let defaultState = {
  user: {},
};

let CreateUserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CreateUser":
      let newState = { ...state };
      newState = {
        user: { ...action.payload },
      };
      return newState;
    case "LOGOUT":
      console.log('LOGOUT')
      let newState1 = { ...state };
      newState1 = {
        user: {},
      };
      return newState1;
    default:
      return state;
  }
};

export default CreateUserReducer;
