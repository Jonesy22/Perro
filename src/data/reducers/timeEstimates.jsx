import { ADD_TIME_ESTIMATE } from "../actionTypes.js";

const initialState = {
    allIds: [0],
    byIds: {0: {estimate: [{x: "01/01/2020", y: 0},{x: "01/8/2020", y: 5}, {x: "01/15/2020", y: 16},{x: "01/22/2020", y: 21},{x: "01/29/2020", y: 29},{x: "02/05/2020", y: 32}], 
    actual: [{x: "01/01/2020", y: 36}, {x: "01/8/2020", y: 36}, {x: "01/15/2020", y: 36}, {x: "01/22/2020", y: 37}, {x: "01/29/2020", y: 37}, {x: "02/05/2020", y: 37}]}}
}

const executeAction = function(state = initialState, action) {
    switch (action.type) {
      case ADD_TIME_ESTIMATE: {
        const { id, content } = action.payload;
  
        return {
          ...state,
          allIds: [...state.allIds, id],
          byIds: {
            ...state.byIds,
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