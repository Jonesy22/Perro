export function createTask(taskName, taskEstimate, dueDate, taskSummary, taskDescription, parentId, userId, childIds, commits = {}) {
    return {
        Name: taskName,
        Estimate: taskEstimate, 
        DueDate: new Date(dueDate).toISOString(),
        Summary: taskSummary, 
        Description: taskDescription, 
        userId: userId,
        parentId: parentId, 
        childIds: childIds,
        commits: commits
    }
}

export function createCommit(commitId, commitName, taskId, commitWorkCompleted, commitDescription, commitTimestamp, commitCompleted, commitReporter) {
    return {
        commitId: commitId,
        commitName: commitName,
        taskId,
        commitWorkCompleted: commitWorkCompleted, 
        commitDescription: commitDescription,
        commitTimestamp: commitTimestamp, 
        commitCompleted: commitCompleted,  
        commitReporter: commitReporter ? commitReporter : "Person1", 
    }
}

export function createTeam(teamName,teamLead,teamMembers = []){
    return {
        teamName:teamName,
        teamLead:teamLead,
        teamMembers: teamMembers,
    }
}

export function createUser(fname,lname,email,teams = []){
    return {
        fname: fname,
        lname: lname,
        email: email,
        teams: teams,
    }
}