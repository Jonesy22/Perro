
export const getTasksState = store => store.tasks;
export const getTimeEstimatesState = store => store.timeEstimates;
export const getAppDataState = store => store.appData;

export const getSelectedTaskId = store => 
getAppDataState(store) ? getAppDataState(store).selectedId : -1;

export const getSelectedCommitId = store =>
getAppDataState(store) ? getAppDataState(store).commitId : -1;

export const getSelectedTask = store => {
    return getTaskById(store, getSelectedTaskId(store)) || {};
}

export const getSelectedTaskCommits = store => 
getSelectedTask(store).content.commits;

export const getTaskIdList = store =>
  getTasksState(store) ? getTasksState(store).allIds : [];

export const getTaskById = (store, id) => {
    if(id !== -1) {
        return getTasksState(store) ? { ...getTasksState(store).byIds[id], id } : {};
    } else {
        return getTasksState(store) ? { ...getTasksState(store).emptyTask, id } : {};
    }
}

export const getUserProfile = function(store) {
    
    return getAppDataState(store) ? getAppDataState(store).userProfile : {};

}

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTasks = store => getTaskIdList(store).map(id => getTaskById(store, id));

const getChildrenRecursively = function(store, id) {
    var task = getTaskById(store, id)
    task.content.children = {}
    if (task.content.childIds.length > 0) {
        for(var i = 0; i < task.content.childIds.length; i++) {
            task.content.children[task.content.childIds[i]] = getChildrenRecursively(store, task.content.childIds[i])
        }
    }
    return task
}

export const getTaskHierarchy = function(store) {
    let taskList = getTasks(store)
    var taskHierarchy = {}
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].content.parentId === -1) {
            taskHierarchy[taskList[i].id] = getChildrenRecursively(store, taskList[i].id);
        }
    }
    return taskHierarchy
}


export const getTaskTimeEstimateData = (store, id) => {
    if (id in getTimeEstimatesState(store).byIds) {
        return getTimeEstimatesState(store).byIds[id];
    } else {
        return []
    }
}

export const getAllChildTimeEstimates = function(store) {
    // TODO we need to decide how to handle the time estimates for a task with sub tasks.
    // Im thinking we can just add all of the data together down a given tasks children
    // such that when clicking on a task it shows the time estimate for that task + its children
    // which would mean that adding a sub task will increase the time estimate/work for its parents.
    // We can do that summation here so that we don't have to add data to a parent task when adding time data to a child
    console.log(getSelectedTaskId(store))
    return getTaskTimeEstimateData(store, getSelectedTaskId(store))
}

export const getTimeEstimatesRecursively = function(store, id) {
    var taskTimeEstimate = {};
    var parents = [id];
    while(parents.length > 0) {
        let task = getTaskById(store, parents[0])
        if (task.content.childIds.length > 0) {
            for(var i = 0; i < task.content.childIds.length; i++) {
                parents.push(task.content.childIds[i])
            }
        }
        taskTimeEstimate[task.content.DueDate] = (taskTimeEstimate[task.content.DueDate] || 0) + task.content.Estimate;
        parents.shift();
    }
    return taskTimeEstimate
}

export const getCommitsRecursively = function(store, id) {
    var commits = {};
    var parents = [id];
    
    while(parents.length > 0) {
        let task = getTaskById(store, parents[0])
        if (!task.content) {
            break;
        }
        if (task.content.childIds.length > 0) {
            for(var i = 0; i < task.content.childIds.length; i++) {
                parents.push(task.content.childIds[i])
            }
        }
        commits = {...commits, ...task.content.commits};
        parents.shift();
        
    }
    return commits
}


export const getGraphDataForTask = function(store, id) {
    let taskTimeEstimate = getTimeEstimatesRecursively(store, id);
    let graphDataEstimate = [];
    let sum = 0;
    Object.keys(taskTimeEstimate)
      .sort()
      .forEach(function(key, i) {
          sum += taskTimeEstimate[key]
          graphDataEstimate.push({x: new Date(key), y: sum})
       });

    let commits = getCommitsRecursively(store, id);
    let graphDataActual = [];
    let actualSum = 0;

    Object.entries(commits)
      .sort((a,b) => (a[1].commitTimestamp > b[1].commitTimestamp) - (a[1].commitTimestamp < b[1].commitTimestamp))
      .forEach(function(value, i) {
        
        actualSum += value[1].commitWorkCompleted;
        graphDataActual.push({x: new Date(value[1].commitTimestamp), y: actualSum})
       });
  
    return { estimate: graphDataEstimate, actual: graphDataActual};
}

export const getCommitWithTaskId = function(store, taskId, commitId) {
    return getSelectedTask(store, taskId).content.commits[commitId] ? getSelectedTask(store, taskId).content.commits[commitId] : {};
}

export const getTaskChildrenList = function (store, taskId) {
    var task = getTaskById(store, taskId)
    var list = []
    list.push(task)
    if (task.content.childIds.length > 0) {
        for(var i = 0; i < task.content.childIds.length; i++) {
            list = list.concat(getTaskChildrenList(store, task.content.childIds[i]))
        }
    }
    return list
}


export const getTaskDataByDate = function(store, taskId) {
    let taskList = getTaskChildrenList(store, taskId);
    var taskLookup = {};
    for (let i = 0; i < taskList.length; i++) {
        let task = taskList[i];
        if (taskLookup[task.content.DueDate]){
            taskLookup[task.content.DueDate].push(task)
        }
        else {
            taskLookup[task.content.DueDate] = [task]
        }
    }
    return taskLookup
}

export const getCommitDataByDate = function(store, taskId) {
    let commitList = getCommitsRecursively(store, taskId);
    var commitLookup = {};
    if (commitList.length === 0) {
        return 0;
    }
    for (const i in commitList) {
        let commit = commitList[i];
        if (commitLookup[commit.commitTimestamp]){
            commitLookup[commit.commitTimestamp].push(commit)
        }
        else {
            commitLookup[commit.commitTimestamp] = [commit]
        }
    }
    return commitLookup
}