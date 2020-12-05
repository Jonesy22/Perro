import { ADD_TASK, DELETE_TASK } from "./actionTypes";

let nextTaskId = 3;

export const addTask = (content) => ({
  type: ADD_TASK,
  payload: {
    id: ++nextTaskId,
    content
  }
});

export const deleteTask = (content) => ({
  type: DELETE_TASK,
  payload: {
    id: content.id,
    content
  }
});
