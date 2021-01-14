import { combineReducers } from "redux";
import tasks from "./tasks";
import timeEstimates from "./timeEstimates";
import appData from "./appData";

export default combineReducers({ tasks, timeEstimates, appData });
