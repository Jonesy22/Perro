import { createStore } from "redux";
import rootReducer from "./reducers";
import configureStore, { history } from './configureStore'


export default createStore(rootReducer(history));
