

export function createTask(taskName, taskEstimate, dueDate, taskSummary, taskDescription, parentId, childIds) {
    return {
        Name: taskName,
        Estimate: taskEstimate, 
        DueDate: dueDate,
        Summary: taskSummary, 
        Description: taskDescription,  
        parentId: parentId, 
        childIds:childIds
    }
}