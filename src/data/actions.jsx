import { ADD_TASK, ADD_TIME_ESTIMATE, SET_SELECTED_ID, DELETE_TASK } from "./actionTypes";


let nextTaskId = 5;
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

export const deleteTask = (content) => ({
  type: DELETE_TASK,
  payload: {
    id: content.id,
    content
  }
});