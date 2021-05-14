import { ADD_COMMIT, ADD_TASK, DELETE_TASK, DELETE_COMMIT, UPDATE_TASK, ADD_TASK_LIST, ADD_COMMIT_LIST, ADD_TEAM_SHARE_LIST, REMOVE_TEAM_SHARE_LIST } from "../actionTypes.js";
import {createTask} from '../createObjects.js';

const initialState = {
  emptyTask: {content: createTask("", 0, new Date(), "" , "", null, 0, [])},
  allIds: [/*0, 1, 2, 3, 4*/], // list of ids of all the tasks that are loaded
  byIds: {
    // 0: {content: createTask("Milestone 1", 5, "2021-01-31", "Summary Placeholder", "Description for milestone 1",  -1, [1, 3])}, 
    // 1: {content: createTask("Task 1", 3, "2021-01-27", "Summary for task 1", "Description for task 1",  0, [2, 4])}, 
    // 2: {content: createTask("Subtask 1", 1, "2021-01-28", "Summary subtask 1", "Description subtask 1",  1, [])}, 
    // 3: {content: createTask("Task 2", 4, "2021-01-29", "Summary for task 2", "Description for task 2",  0, [])}, 
    // 4: {content: createTask("Subtask 2", 1.5, "2021-01-30", "Summary subtask 2", "Description subtask 2",  1, [])}, 
  }   // map of all tasks by id
};

const executeAction = function(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK: {
      const { id, content } = action.payload;
      var updatedByIds = {...state.byIds}
      if(content.parentId != -1 && content.parentId != null){
        updatedByIds[content.parentId].content.childIds.push(id)
      }
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...updatedByIds,
          [id]: {
            content
          }
        }
      };
    }

    case ADD_TASK_LIST: {
      const { allIds, byIds } = action.payload;
      var updatedByIds = {...state.byIds}
      for(let idx in allIds) {
        let taskIdx = allIds[idx];
        updatedByIds[taskIdx] = {content: byIds[taskIdx]};
        if(byIds[taskIdx].parentId !== -1 && byIds[taskIdx].parentId !== null){
          if(updatedByIds[byIds[taskIdx].parentId]) {
            updatedByIds[byIds[taskIdx].parentId].content.childIds.push(taskIdx) 
          } else {
            updatedByIds[taskIdx].content.parentId = -1;
          }
        }
      }
      return {
        ...state,
        allIds: [...state.allIds, ...allIds],
        byIds: {
          ...updatedByIds
        }
      };
    }

    case ADD_TEAM_SHARE_LIST: {
      const { content } = action.payload;
      var updatedByIds = {...state.byIds}
      for(let idx in content) {
        let taskId = content[idx][1];
        let teamId = content[idx][0];
        if(updatedByIds[taskId] && !updatedByIds[taskId].content.sharedTeamIds.includes(teamId) ) {
          updatedByIds[taskId].content.sharedTeamIds.push(teamId);
        }
      }
      return {
        ...state,
        byIds: {
          ...updatedByIds
        }
      };
    }

    case ADD_COMMIT: {
      const { id, content } = action.payload;
      let updatedByIds = {...state.byIds};
      if(content.commitCompleted) {
        updatedByIds[content.taskId].content.completed = true;
      }
      updatedByIds[content.taskId].content.commits = {...updatedByIds[content.taskId].content.commits, [id]: {...content, "commitId": id}};
      return {
        ...state,
        byIds: {
          ...updatedByIds
        }
      };
    }

    case ADD_COMMIT_LIST: {
      const { commits } = action.payload;
      let updatedByIds = {...state.byIds};
      for(const idx in commits) {
        if(commits[idx].commitCompleted) {
          updatedByIds[commits[idx].taskId].content.completed = true;
        }
        updatedByIds[commits[idx].taskId].content.commits = {...updatedByIds[commits[idx].taskId].content.commits, [commits[idx].commitId]: commits[idx]};
      }
      return {
        ...state,
        byIds: {
          ...updatedByIds
        }
      };
    }

    case DELETE_COMMIT: {
      const { id, content } = action.payload;
      let updatedByIds = {...state.byIds};
      updatedByIds[content.taskId].content.commits = {...updatedByIds[content.taskId].content.commits};
      delete updatedByIds[content.taskId].content.commits[id];
      return {
        ...state,
        byIds: {
          ...updatedByIds
        }
      };
    }
    
    case UPDATE_TASK: {
      const { id, content } = action.payload;
      updatedByIds = state.byIds
      return {
        ...state,
        byIds: {
          ...updatedByIds,
          [id]: {
            content
          }
        }
      };
    }

    case DELETE_TASK: {
      const { id, content } = action.payload;
      updatedByIds = {...state.byIds}
      var updatedAllIds = [...state.allIds]

      // remove the deletedId from the parents list of childIds
      if(updatedByIds[id].content.parentId !== -1 && updatedByIds[id].content.parentId !== null ) {
        let childIdToDelete = updatedByIds[updatedByIds[id].content.parentId].content.childIds.indexOf(id)
        updatedByIds[updatedByIds[id].content.parentId].content.childIds.splice(childIdToDelete, 1)
        delete updatedByIds[updatedByIds[id].content.parentId].content.children[id]
      }
      
      if (content.mode === 0) {    // mode 0 means deleting all subtasks
        // list that will contain the id for byIds of ALL children/grandchildren of deleted task
        var listOfIdsToDelete = [id];

        // recursively get grandchildren down the list
        for(var i = 0; i < listOfIdsToDelete.length; i++) {
          var parentIdToCheck = listOfIdsToDelete[i];
          for (var j = 0; j < updatedByIds[parentIdToCheck].content.childIds.length; j++) {
              listOfIdsToDelete.push(updatedByIds[parentIdToCheck].content.childIds[j])
          }
        }

        // for each childId we want to delete, remove it and remove its id from allIds
        for (i = 0; i < listOfIdsToDelete.length; i++) {
          delete updatedByIds[listOfIdsToDelete[i]]
          updatedAllIds.splice(updatedAllIds.indexOf(listOfIdsToDelete[i]), 1)
          // delete updatedAllIds[updatedAllIds.indexOf(listOfIdsToDelete[i])]
        }
      } else {  // mode 1 to move subtasks to parent of deleted task
        // remove the id of the deleted task from allIds
        updatedAllIds.splice(updatedAllIds.indexOf(id), 1)
        // parent id of the task being deleted
        let newParentId = updatedByIds[id].content.parentId
        // for each child of the deleted task, set its parent to the parent of deleted task
        // and add its id to the childIds of its new parent
        for (i = 0; i < updatedByIds[id].content.childIds.length; i++) {
          updatedByIds[updatedByIds[id].content.childIds[i]].content.parentId = newParentId
          if(newParentId !== -1 && newParentId !== null) {
            updatedByIds[newParentId].content.childIds.push(updatedByIds[id].content.childIds[i])
          }
        }
        // remove the deleted task
        delete updatedByIds[id]
      }

      return {
        ...state,
        allIds: [...updatedAllIds],
        byIds: {
          ...updatedByIds
        }
      };
    }

    default:
      return state;
  }
}

export default executeAction;