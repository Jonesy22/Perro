import { SET_SELECTED_ID, SET_USER_PROFILE } from "../actionTypes.js";

const initialState = {
    selectedId: 0,
    userProfile: {},
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
        case SET_USER_PROFILE: {
            console.log('setting user profile in appData. Here: ', action.payload);
            const { userProfile } = action.payload;
            return {
                ...state,
                userProfile: userProfile
            };
        }

        default:
            return state;
    }
  }
  
  export default executeAction;