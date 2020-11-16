export const getTasksState = store => store.tasks;

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
