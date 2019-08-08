import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {places, loader, auth} from './reducers/';
import * as thunk from 'redux-thunk';

const rootReducer = combineReducers({
  places: places,
  loader: loader,
  auth: auth
});

let composeEnhancer =  compose;

if(__DEV__) {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const middlewares = [thunk.default];

const configureStore = () => createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)));

export default configureStore;
