import { ADD_TASK, ADD_TIME_ESTIMATE, SET_SELECTED_ID } from "./actionTypes";

let nextTaskId = 3;
let nextTimeEstimateId = 1;

export const addTask = (content) => ({
  type: ADD_TASK,
  payload: {
    id: ++nextTaskId,
    content
  }
});

export const addTimeEstimate = (content) => ({
  type: ADD_TIME_ESTIMATE,
  payload: {
    id: ++nextTimeEstimateId,
    content
  }
});

export const setSelectedId = (content) => ({
  type: SET_SELECTED_ID,
  payload: {
    selectedId: content
  }
});
