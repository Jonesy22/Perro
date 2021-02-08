import { ADD_TEAM} from "../actionTypes.js";
import { createTeam } from "../createObjects.js";

const initialState = {
    allIds: [0], // list of ids of all the tasks that are loaded
    byIds: {
        0: {content :createTeam("Perro",0,"Default User")}, 
    }
}

const executeAction = function(state = initialState, action) {
    switch (action.type) {
        case ADD_TEAM: {
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