import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import configureStore, { history } from './configureStore'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export default createStore(rootReducer(history), composedEnhancer);
