import { ADD_TEAM, ADD_MEMBER} from "../actionTypes.js";
import { createTeam } from "../createObjects.js";

const initialState = {
    allIds: [0], // list of ids of all the tasks that are loaded
    byIds: {
        // array should be an array of objects (essenetially tuples with a userId and a accepted boolean)
        0: {content :createTeam("Perro",0,"Default User", [])}, 
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
        //Want to 
        case ADD_MEMBER: {
            const { teamId, userId, content } = action.payload;
            let teams = {...state.byIds}
            teams[teamId].content.teams.push(userId)
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