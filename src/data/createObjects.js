

export function createTask(taskName, taskEstimate, taskSummary, taskDescription, parentId, childIds) {
    return {
        Name: taskName,
        Estimate: taskEstimate, 
        Summary: taskSummary, 
        Description: taskDescription,  
        parentId: parentId, 
        childIds:childIds
    }
}