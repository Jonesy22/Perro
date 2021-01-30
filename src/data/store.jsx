import { createStore } from "redux";
import rootReducer from "./reducers";
import configureStore, { history } from './configureStore'

export default createStore(rootReducer(history), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
