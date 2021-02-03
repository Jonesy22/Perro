import { ADD_TASK, ADD_TIME_ESTIMATE, SET_SELECTED_ID, DELETE_TASK, ADD_COMMIT, DELETE_COMMIT, UPDATE_TASK, SET_USER_PROFILE } from "./actionTypes";


let nextTaskId = 5;
let nextTimeEstimateId = 1;
let nextCommitId = 0;

export const addTask = (content) => ({
  type: ADD_TASK,
  payload: {
    id: ++nextTaskId,
    content
  }
});

export const addCommit = (content) => ({
  type: ADD_COMMIT,
  payload: {
    id: content.commitId !== -1? content.commitId : ++nextCommitId,
    content
  }
})

export const deleteCommit = (content) => ({
  type: DELETE_COMMIT,
  payload: {
    id: content.commitId,
    content
  }
})

export const updateTask = (content, id) => ({
  type: UPDATE_TASK,
  payload: {
    id: id,
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

export const setUserProfile = (content) => ({
  type: SET_USER_PROFILE,
  payload: {
    userProfile: content
  }
})

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