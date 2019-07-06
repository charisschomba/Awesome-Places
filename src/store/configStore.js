import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import placesReducer from './reducers/placesReducer';

const rootReducer = combineReducers({
  places: placesReducer
});

let composeEnhancer =  compose;

if(__DEV__) {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const middleware = [];

const configureStore = () => createStore(rootReducer, composeEnhancer(applyMiddleware(...middleware)));

export default configureStore;
