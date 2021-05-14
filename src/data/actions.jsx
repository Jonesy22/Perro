import { ADD_TASK, ADD_TASK_LIST, ADD_TIME_ESTIMATE, SET_SELECTED_ID, DELETE_TASK, ADD_COMMIT, ADD_COMMIT_LIST, DELETE_COMMIT, ADD_INV_LIST, UPDATE_TASK, SET_USER_PROFILE, REMOVE_TEAM_SHARE_LIST, ADD_TEAM_SHARE_LIST, ADD_TEAM, ADD_USER, ADD_USER_LIST, ADD_MEMBER, REMOVE_MEMBER, ADD_TEAM_TO_USER, ADD_TEAMS_LIST, REMOVE_TEAM_FROM_USER, UPDATE_TEAMS_TEAMSTATUS, UPDATE_USERS_TEAMSTATUS, DELETE_TEAM, DELETE_INVITATION } from "./actionTypes";
import {createTask, createCommit, createTeam, createUser} from './createObjects';

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

export const addTeamShareList = (content) => ({
  type: ADD_TEAM_SHARE_LIST,
  payload: {
    content
  }
});

export const removeTeamShareList = (content) => ({
  type: REMOVE_TEAM_SHARE_LIST,
  payload: {
    content
  }
});

export const addTeam = (content) => ({
  type: ADD_TEAM,
  payload: {
    id: content.teamId,
    content
  }
});

export const addTeamsList = (content) => ({
  type: ADD_TEAMS_LIST,
  payload: {
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

export const addUserList = (content) => ({
  type: ADD_USER_LIST,
  payload: {
    content
  }
})

export const addMember = (userId, teamId, accepted=false) => ({
  type: ADD_MEMBER,
  payload: {
    userId: userId,
    teamId: teamId,
    accepted: accepted
  }
})

export const removeMember = (userId, teamId) => ({
  type: REMOVE_MEMBER,
  payload: {
    userId: userId,
    teamId: teamId,
  }
})

export const deleteTeam = (teamId) => ({
  type: DELETE_TEAM,
  payload: {
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

export const deleteInvitation = (userEmail, teamId) => ({
  type: DELETE_INVITATION,
  payload: {
    userEmail: userEmail,
    teamId: teamId,
  }
})

export const addInvitationList = (content) => ({
  type: ADD_INV_LIST,
  payload: {
    content
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
  const response = await tasksResponse.json();
  const data = response.tasks;
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
    byIds[data[taskIdx].taskID] = createTask(data[taskIdx].tname, data[taskIdx].timeEstimate, data[taskIdx].dueDate, data[taskIdx].summary, data[taskIdx].description, data[taskIdx].parentID, data[taskIdx].userId, []);
  }

  for (let tatIdx in response.teamAccessibleTasks) {
    if(byIds[response.teamAccessibleTasks[tatIdx].taskID]) {
      byIds[response.teamAccessibleTasks[tatIdx].taskID].sharedTeamIds.push(response.teamAccessibleTasks[tatIdx].teamID);
    }
  }
  dispatch(addTaskList(allIds, byIds));
  dispatch(setSelectedId(selectedId));
  dispatch(fetchCommits);
  dispatch(fetchUsers);
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
    commits[data[idx].commitID] = createCommit(data[idx].commitID, data[idx].commitName, data[idx].parentTaskID, data[idx].timeWorked, data[idx].commitMessage, data[idx].commitTime, data[idx].commitCompleted, data[idx].committingUserID)
  }
  dispatch(addCommitList(commits));
}

export async function fetchUsers(dispatch, getState) {
  const usersResponse = await fetch("http://localhost:5000/users/accessibleUsers", {
      method: "GET",
      credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "true"
    }
  });
  const data = await usersResponse.json();
  if (data.error) throw new Error(data.error)
  
  console.log("data from users: ", data);
  let users = {};
  for(let idx in data) {
    users[data[idx].userID] = {content: createUser(data[idx].fname, data[idx].lname, data[idx].email)}
  }
  console.log(users);
  dispatch(addUserList(users));
  dispatch(fetchTeams);
}

export async function fetchTeams(dispatch, getState) {
  const teamsResponse = await fetch("http://localhost:5000/teams/get", {
      method: "GET",
      credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "true"
    }
  });
  const data = await teamsResponse.json();
  if (data.error) throw new Error(data.error)
  
  console.log("data from teams: ", data);
  let teams = {};
  for(let idx in data.teams) {
    teams[data.teams[idx].teamID] = {content: createTeam(data.teams[idx].teamName, "", [], data.teams[idx].teamID)}
  }
  
  for(let idx in data.teamUsers) {
    teams[data.teamUsers[idx].teamID].content.teamMembers.push({userId: data.teamUsers[idx].userEmail, teamStatus: Boolean(data.teamUsers[idx].acceptedInvite)})
    if(data.teamUsers[idx].teamAdmin === 1) {
      teams[data.teamUsers[idx].teamID].content.teamLead = data.teamUsers[idx].userEmail;
    }
  }

  dispatch(addTeamsList(teams));
  dispatch(addInvitationList(data.invitations));
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

export function uploadTask(task, teamIdList=[]) {
  let newTask = false;
  if (!task.taskId) {
    task.taskId = null;
    newTask = true;
  } 

  task.teamIdList = teamIdList;

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
    if(data.values.length > 0) {
      dispatch(addTeamShareList(data.values))
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

export function uploadNewTeam(team) {
  return async function uploadTeamThunk(dispatch, getState) {
    const teamResponse = await fetch("http://localhost:5000/teams/create", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(team),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "true"
      }
    });
    const data = await teamResponse.json();
    if (data.error) throw new Error(data.error)
    
    console.log("data from new team: ", data);
    team.teamId = data.insertId;
    dispatch(addTeam(team));
    dispatch(addMember(team.teamLead, data.insertId, true));
  }
}

export function removeTeamDB(team) {
  return async function removeTeamDBThunk(dispatch, getState) {
    const teamResponse = await fetch("http://localhost:5000/teams/delete", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({teamId: team}),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "true"
      }
    });
    const data = await teamResponse.json();
    if (data.error) throw new Error(data.error)

    // TODO Setup action for removing from redux
    dispatch(deleteTeam(team));
  }
}

export function acceptTeamInvDB(userEmail, teamId) {
  return async function acceptTeamInvDBThunk(dispatch, getState) {
    const teamResponse = await fetch("http://localhost:5000/teams/acceptInv", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({email: userEmail, teamId: teamId}),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "true"
      }
    });
    const data = await teamResponse.json();
    if (data.error) throw new Error(data.error)

    // TODO Setup action for accepting team invite in redux
    dispatch(updateTeamsTeamStatus(teamId, userEmail));
    dispatch(deleteInvitation(userEmail, teamId));
  }
}

export function declineTeamInvDB(userEmail, teamId) {
  return async function declineTeamInvDBThunk(dispatch, getState) {
    const teamResponse = await fetch("http://localhost:5000/teams/declineInv", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({email: userEmail, teamId: teamId}),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "true"
      }
    });
    const data = await teamResponse.json();
    if (data.error) throw new Error(data.error)

    // TODO refactor these so they take email instead of id, and store teams members by email as new invites wont have id
    dispatch(removeMember(userEmail, teamId));
    dispatch(deleteInvitation(userEmail, teamId));
    // dispatch(removeTeamFromUser(userEmail, teamId))
  }
}

export function uploadTeamMember(team) {
  return async function uploadTeamMemberThunk(dispatch, getState) {
    const teamResponse = await fetch("http://localhost:5000/teams/add", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(team),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "true"
      }
    });
    const data = await teamResponse.json();
    if (data.error) throw new Error(data.error)
    
    dispatch(addMember(team.email, team.teamId));
  }
}

export function uploadShareTeam(taskIdList, teamId) {
  return async function uploadTeamMemberThunk(dispatch, getState) {
    const teamResponse = await fetch("http://localhost:5000/tasks/shareTeam", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({taskIdList: taskIdList, teamId: teamId}),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "true"
      }
    });
    const data = await teamResponse.json();
    console.log(data)
    if (data.error) throw new Error(data.error)
    dispatch(addTeamShareList(data))
  }
}

export function uploadRemoveShareTeam(taskIdList, teamId) {
  return async function uploadTeamMemberThunk(dispatch, getState) {
    const teamResponse = await fetch("http://localhost:5000/tasks/removeShareTeam", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({taskIdList: taskIdList, teamId: teamId}),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "true"
      }
    });
    const data = await teamResponse.json();
    console.log(data)
    if (data.error) throw new Error(data.error)
    dispatch(removeTeamShareList(data))
  }
}