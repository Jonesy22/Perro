import { ADD_COMMIT, ADD_TASK, DELETE_TASK } from "../actionTypes.js";
import {createTask} from '../createObjects.js';

const initialState = {
  allIds: [0, 1, 2, 3, 4], // list of ids of all the tasks that are loaded
  byIds: {
    0: {content: createTask("Milestone 1", 5, "2021-01-31", "Summary Placeholder", "Description for milestone 1",  -1, [1, 3])}, 
    1: {content: createTask("Task 1", 3, "2021-01-27", "Summary for task 1", "Description for task 1",  0, [2, 4])}, 
    2: {content: createTask("Subtask 1", 1, "2021-01-28", "Summary subtask 1", "Description subtask 1",  1, [])}, 
    3: {content: createTask("Task 2", 4, "2021-01-29", "Summary for task 2", "Description for task 2",  0, [])}, 
    4: {content: createTask("Subtask 2", 1.5, "2021-01-30", "Summary subtask 2", "Description subtask 2",  1, [])}, 
  }   // map of all tasks by id
};

const executeAction = function(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK: {
      const { id, content } = action.payload;
      var updatedByIds = {...state.byIds}
      if(content.parentId !== -1){
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

    case ADD_COMMIT: {
      const { id, content } = action.payload;
      let updatedByIds = {...state.byIds};
      updatedByIds[content.taskId].content.commits = {...updatedByIds[content.taskId].content.commits, [id]: {...content, "commitId": id}};
      return {
        ...state,
        byIds: {
          ...updatedByIds
        }
      };
    }

    case DELETE_TASK: {
      const { id, content } = action.payload;
      var updatedByIds = {...state.byIds}
      var updatedAllIds = {...state.allIds}

      // remove the deletedId from the parents list of childIds
      let childIdToDelete = updatedByIds[updatedByIds[id].content.parentId].content.childIds.indexOf(id)
      updatedByIds[updatedByIds[id].content.parentId].content.childIds.splice(childIdToDelete, 1)
      delete updatedByIds[updatedByIds[id].content.parentId].content.children[id]

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
        for (var i = 0; i < listOfIdsToDelete.length; i++) {
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
        for (var i = 0; i < updatedByIds[id].content.childIds.length; i++) {
          updatedByIds[updatedByIds[id].content.childIds[i]].content.parentId = newParentId
          updatedByIds[newParentId].content.childIds.push(updatedByIds[id].content.childIds[i])
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