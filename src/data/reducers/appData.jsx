import { SET_SELECTED_ID } from "../actionTypes.js";

const initialState = {
    selectedId: 0,
}

const executeAction = function(state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_ID: {
            const { selectedId } = action.payload;
            return {
              ...state,
              selectedId: selectedId
            };
        }
        default:
            return state;
    }
  }
  
  export default executeAction;