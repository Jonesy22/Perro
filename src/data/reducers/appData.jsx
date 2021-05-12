import { SET_SELECTED_ID, SET_USER_PROFILE, SET_SEARCH_TASK } from "../actionTypes.js";

const initialState = {
    selectedId: 0,
    userProfile: {},
    searchedTask: "",
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
            const { userProfile } = action.payload;
            return {
                ...state,
                userProfile: userProfile
            };
        }
        case SET_SEARCH_TASK: {
            const { searchedTask } = action.payload;
            console.log("SEARCH!!!!!!!:", searchedTask);
            return {
                ...state,
                searchedTask: searchedTask
            };
        }

        default:
            return state;
    }
  }
  
  export default executeAction;