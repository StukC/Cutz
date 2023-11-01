import { combineReducers } from "redux";
import CreateUserReducer from "./AuthUser";

let reducers = combineReducers({
  CreateUserReducer: CreateUserReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
