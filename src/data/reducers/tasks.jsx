import { ADD_TASK } from "../actionTypes.js";

const initialState = {
  allIds: [0], // list of ids of all the tasks that are loaded
  byIds: {0: {content: {Name: "Milestone 1", Estimate: 5, Summary: "Summary", Description: "Description",  parentId:-1, childIds:[]}}, }   // map of all tasks by id
};

const executeAction = function(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK: {
      const { id, content } = action.payload;
      var updatedByIds = state.byIds
      if(content.parentId != -1){
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
    default:
      return state;
  }
}

export default executeAction;