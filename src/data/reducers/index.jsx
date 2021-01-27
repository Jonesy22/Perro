import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import tasks from "./tasks";
import timeEstimates from "./timeEstimates";
import appData from "./appData";

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    tasks: tasks, 
    timeEstimates: timeEstimates, 
    appData: appData
  })
  export default createRootReducer

