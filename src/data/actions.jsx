import { ADD_TASK, ADD_TASK_LIST, ADD_TIME_ESTIMATE, SET_SELECTED_ID, DELETE_TASK, ADD_COMMIT, ADD_COMMIT_LIST, DELETE_COMMIT, UPDATE_TASK, SET_USER_PROFILE, ADD_TEAM, ADD_USER, ADD_MEMBER, REMOVE_MEMBER, ADD_TEAM_TO_USER, REMOVE_TEAM_FROM_USER, UPDATE_TEAMS_TEAMSTATUS, UPDATE_USERS_TEAMSTATUS } from "./actionTypes";
import {createTask, createCommit} from './createObjects';

let nextTaskId = 5;
let nextTimeEstimateId = 1;
let nextCommitId = 0;
let nextTeamId=1;
let nextUserId=3;

export const addTask = (content) => ({
  type: ADD_TASK,
  payload: {
    id: content.taskId !== null ? content.taskId : ++nextTaskId,
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

export const updateTask = (content) => ({
  type: UPDATE_TASK,
  payload: {
    id: content.taskId,
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
    id: content.taskId,
    content
  }
});

export const addTeam = (content) => ({
  type: ADD_TEAM,
  payload: {
    id: nextTeamId++,
    content
  }
});

export const addUser = (content) => ({
  type: ADD_USER,
  payload: {
    id: nextUserId++,
    content
  }
})

export const addMember = (userId, teamId) => ({
  type: ADD_MEMBER,
  payload: {
    userId: userId,
    teamId: teamId,
    nextUserId: nextUserId++
  }
})

export const removeMember = (userId, teamId) => ({
  type: REMOVE_MEMBER,
  payload: {
    userId: userId,
    teamId: teamId,
  }
})

export const addTeamToUser = (userId, teamId) => ({
  type: ADD_TEAM_TO_USER,
  payload: {
    userId: userId,
    teamId: teamId,
  }
})

export const removeTeamFromUser = (userId, teamId) => ({
  type: REMOVE_TEAM_FROM_USER,
  payload: {
    userId: userId,
    teamId: teamId,
  }
})

export const updateTeamsTeamStatus = (teamId, userId) => ({
  type: UPDATE_TEAMS_TEAMSTATUS,
  payload: {
    teamId: teamId,
    userId: userId,
  }
})

export const updateUsersTeamStatus = (userId, teamId) => ({
  type: UPDATE_USERS_TEAMSTATUS,
  payload: {
    userId: userId,
    teamId: teamId,
  }
})

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
  let selectedId = null
  for(let taskIdx in data) {
    if(!selectedId && data[taskIdx].parentID == null) {
      selectedId = data[taskIdx].taskID;
    }
    allIds.push(data[taskIdx].taskID)
    byIds[data[taskIdx].taskID] = createTask(data[taskIdx].tname, data[taskIdx].timeEstimate, data[taskIdx].dueDate, data[taskIdx].summary, data[taskIdx].description, data[taskIdx].parentID, []);
  }
  dispatch(addTaskList(allIds, byIds));
  dispatch(setSelectedId(selectedId));
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
    const commitResponse = await fetch("http://localhost:5000/commits/create", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(commit),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "true"
      }
    });
    const data = await commitResponse.json();
    if (data.error) throw new Error(data.error)
    
    console.log("data from new commit: ", data);
    commit.commitId = data.insertId;
    dispatch(addCommit(commit));
  }
}

export function uploadTask(task) {
  let newTask = false;
  if (!task.taskId) {
    task.taskId = null;
    newTask = true;
  } 

  return async function uploadTaskThunk(dispatch, getState) {
    const taskResponse = await fetch("http://localhost:5000/tasks/create", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "true"
      }
    });
    const data = await taskResponse.json();
    if (data.error) throw new Error(data.error)
    
    console.log("data from new task: ", data);
    task.taskId = data.insertId;
    if(newTask) {
      dispatch(addTask(task));
    } else {
      dispatch(updateTask(task));
    }
  }
}

export function removeCommitDB(commit) {
  return async function removeCommitDBThunk(dispatch, getState) {
    const commitResponse = await fetch("http://localhost:5000/commits/delete", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({commitId: commit.commitId}),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "true"
      }
    });
    const data = await commitResponse.json();
    if (data.error) throw new Error(data.error)
    
    console.log("data from deleted commit: ", data);
    dispatch(deleteCommit(commit));
  }
}

export function removeTaskDB(task) {
  return async function removeTaskDBThunk(dispatch, getState) {
    const taskResponse = await fetch("http://localhost:5000/tasks/delete", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({taskId: task.taskId, mode: task.mode}),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "true"
      }
    });
    const data = await taskResponse.json();
    if (data.error) throw new Error(data.error)
    
    console.log("data from deleted task: ", data);
    dispatch(deleteTask(task));
  }
}



