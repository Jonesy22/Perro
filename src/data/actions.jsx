import { ADD_TASK, ADD_TASK_LIST, ADD_TIME_ESTIMATE, SET_SELECTED_ID, DELETE_TASK, ADD_COMMIT, ADD_COMMIT_LIST, DELETE_COMMIT, UPDATE_TASK, SET_USER_PROFILE } from "./actionTypes";
import {createTask, createCommit} from './createObjects';

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

export const addTaskList = (allIds, byIds) => ({
  type: ADD_TASK_LIST,
  payload: {
    byIds: byIds,
    allIds: allIds
  }
});

export const addCommit = (content) => ({
  type: ADD_COMMIT,
  payload: {
    id: content.commitId !== null ? content.commitId : ++nextCommitId,
    content
  }
})

export const addCommitList = (commits) => ({
  type: ADD_COMMIT_LIST,
  payload: {
    commits: commits
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

export async function fetchTasks(dispatch, getState) {
  const tasksResponse = await fetch("http://localhost:5000/tasks/get", {
      method: "GET",
      credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "true"
    }
  });
  const data = await tasksResponse.json();
  if (data.error) throw new Error(data.error)
  
  console.log("data from tasks: ", data);
  let allIds = [];
  let byIds = {};
  for(let taskIdx in data) {
    allIds.push(data[taskIdx].taskID)
    byIds[data[taskIdx].taskID] = createTask(data[taskIdx].tname, data[taskIdx].timeEstimate, data[taskIdx].dueDate, data[taskIdx].summary, data[taskIdx].description, data[taskIdx].parentID, []);
  }
  dispatch(addTaskList(allIds, byIds));
  dispatch(fetchCommits);
}

export async function fetchCommits(dispatch, getState) {
  const tasksResponse = await fetch("http://localhost:5000/commits/get", {
      method: "GET",
      credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "true"
    }
  });
  const data = await tasksResponse.json();
  if (data.error) throw new Error(data.error)
  
  console.log("data from commits: ", data);
  let commits = {};
  for(let idx in data) {
    commits[data[idx].commitID] = createCommit(data[idx].commitID, data[idx].commitName, data[idx].parentTaskID, data[idx].timeWorked, data[idx].commitMessage, data[idx].commitTime, data[idx].commitCompleted, data[idx].commitingUserID)
  }
  dispatch(addCommitList(commits));
}

export function uploadCommit(commit) {
  return async function uploadCommitThunk(dispatch, getState) {
    const tasksResponse = await fetch("http://localhost:5000/commits/create", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(commit),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "true"
      }
    });
    const data = await tasksResponse.json();
    if (data.error) throw new Error(data.error)
    
    console.log("data from new commit: ", data);
    commit.commitId = data.insertId;
    dispatch(addCommit(commit));
  }
}

