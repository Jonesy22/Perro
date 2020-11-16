import { ADD_TASK } from "../actionTypes.js";

const initialState = {
  allIds: [0, 1, 2], // list of ids of all the tasks that are loaded
  byIds: {0: {content: {text: "Milestone 1", time: 5, parentId:-1, childIds:[1]}}, 1: {content: {text: "Task 1", time: 10, parentId:0, childIds:[2]}}, 2: {content: {text: "Subtask 1", time: 7, parentId:1, childIds:[]}}, }   // map of all tasks by id
};

const executeAction = function(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK: {
      const { id, content } = action.payload;
      var updatedByIds = state.byIds
      updatedByIds[content.parentId].content.childIds.push(id)

      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...updatedByIds,
          [id]: {
            content,
            completed: false
          }
        }
      };
    }
    default:
      return state;
  }
}

export default executeAction;