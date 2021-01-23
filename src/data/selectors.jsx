export const getTasksState = store => store.tasks;
export const getTimeEstimatesState = store => store.timeEstimates;
export const getAppDataState = store => store.appData;

export const getSelectedTaskId = store => 
getAppDataState(store) ? getAppDataState(store).selectedId : 0;

export const getSelectedTask = store => 
getTaskById(store, getSelectedTaskId(store));

export const getTaskIdList = store =>
  getTasksState(store) ? getTasksState(store).allIds : [];

export const getTaskById = (store, id) =>
getTasksState(store) ? { ...getTasksState(store).byIds[id], id } : {};

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

export const getTimeEstimatesRecursivley = function(store, id) {
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

export const getGraphDataForTask = function(store, id) {
    let taskTimeEstimate = getTimeEstimatesRecursivley(store, id);
    let graphDataEstimate = [];
    let sum = 0;
    Object.keys(taskTimeEstimate)
      .sort()
      .forEach(function(key, i) {
          sum += taskTimeEstimate[key]
          graphDataEstimate.push({x: new Date(key), y: sum})
       });

    return { estimate: graphDataEstimate, actual: []};
}