import {createStore, combineReducers, applyMiddleware} from 'redux';
import authReducers from '../reducers/authReducers';

const rootReducer=combineReducers({
    authReducers:authReducers

})

const store=createStore(rootReducer,applyMiddleware())
export {store}


