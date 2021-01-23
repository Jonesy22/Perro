

export function createTask(taskName, taskEstimate, dueDate, taskSummary, taskDescription, parentId, childIds, commits = []) {
    return {
        Name: taskName,
        Estimate: taskEstimate, 
        DueDate: dueDate,
        Summary: taskSummary, 
        Description: taskDescription,  
        parentId: parentId, 
        childIds: childIds,
        commits: commits
    }
}

export function createCommit(commitName, taskId, commitWorkCompleted, commitDescription, commitTimestamp, commitCompleted, commitReporter) {
    return {
        commitName: commitName,
        taskId, taskId,
        commitWorkCompleted: commitWorkCompleted, 
        commitDescription: commitDescription,
        commitTimestamp: commitTimestamp, 
        commitCompleted: commitCompleted,  
        commitReporter: commitReporter, 
    }
}