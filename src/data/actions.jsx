import { ADD_TASK, ADD_TIME_ESTIMATE, SET_SELECTED_ID, DELETE_TASK, ADD_COMMIT, DELETE_COMMIT, UPDATE_TASK, SET_USER_PROFILE, ADD_TEAM, ADD_USER, ADD_MEMBER, REMOVE_MEMBER, ADD_TEAM_TO_USER, REMOVE_TEAM_FROM_USER } from "./actionTypes";


let nextTaskId = 5;
let nextTimeEstimateId = 1;
let nextCommitId = 0;
let nextTeamId=1;
let nextUserId=3;

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



