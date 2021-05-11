import InputForm from "../../components/InputForm.js";
import { ADD_TEAM, ADD_MEMBER, REMOVE_MEMBER, UPDATE_TEAMS_TEAMSTATUS} from "../actionTypes.js";
import { createTeam } from "../createObjects.js";

const initialState = {
    allIds: [0], // list of ids of all the tasks that are loaded
    byIds: {
        // array should be an array of objects (essenetially tuples with a userId and a accepted boolean)
        0: {content :createTeam("Perro","Default User", [])}, 
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
        case ADD_MEMBER: {
            const {userId, teamId, nextUserId} = action.payload;
            let teams = {...state.byIds}
            let dupCheck = false;
            Object.entries(teams[teamId].content.teamMembers).map(
                (member) => {
                    if(member[1].userId == userId){
                        dupCheck = true;
                    }
                }
            )
            if(dupCheck){
                console.log("Member has already been added")
            }
            else{
                if (userId < 0){
                    teams[teamId].content.teamMembers.push({userId: nextUserId, teamStatus: false})
                }
                else{
                    teams[teamId].content.teamMembers.push({userId: userId, teamStatus: false})
                }
            }
            return {
                ...state,
                byIds: {...teams}
            };
        }
        case REMOVE_MEMBER: {
            const {userId, teamId} = action.payload;
            let teams = {...state.byIds}
            Object.entries(teams[teamId].content.teamMembers).map(
                (member, index) => {
                    if(member[1].userId == userId){
                        teams[teamId].content.teamMembers.splice(index, 1) 
                    }
                }
            )
            return {
                ...state,
                byIds: {...teams}
            };
        }
        case UPDATE_TEAMS_TEAMSTATUS: {
            const { teamId, userId } = action.payload;
            let teams = {...state.byIds}
            Object.entries(teams[teamId].content.teamMembers).map(
                (member) => {
                    if (member[1].userId == userId){
                        member[1].teamStatus = true;
                    }
                }
            )
            return {
                ...state,
                byIds: {...teams}
            };
        }
        default:
            return state;
        }
    }
    
    export default executeAction;