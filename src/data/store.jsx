import { createStore } from "redux";
import rootReducer from "./reducers";
import { history } from './configureStore'


export default createStore(rootReducer(history));
