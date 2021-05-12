import InputForm from "../../components/InputForm.js";
import { ADD_TEAM, ADD_MEMBER, REMOVE_MEMBER, UPDATE_TEAMS_TEAMSTATUS, DELETE_TEAM, DELETE_INVITATION, ADD_TEAMS_LIST, ADD_INV_LIST} from "../actionTypes.js";
import { createTeam } from "../createObjects.js";

const initialState = {
    invitations: [],
    allIds: [0], // list of ids of all the tasks that are loaded
    byIds: {
        // array should be an array of objects (essenetially tuples with a userId and a accepted boolean)
        // 0: {content :createTeam("Perro","Default User", [{userId: "jonetrev@oregonstate.edu", teamStatus: false}], 0)}, 
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

        case ADD_TEAMS_LIST: {
            const { content } = action.payload;
            let ids = [];
            for(let team in content) {
                ids.push(team.teamID);
            }
            return {
                ...state,
                allIds: [...state.allIds, ...ids],
                byIds: {
                    ...state.byIds,
                    ...content
                }
            };
        }
        
        case DELETE_TEAM: {
            const { teamId } = action.payload;
            let teams = {...state.byIds}
            var updatedAllIds = [...state.allIds]
            // delete updatedAllIds[teamId]
            updatedAllIds.splice(updatedAllIds.indexOf(teamId), 1)
            console.log("teamId: "+ teamId)
            delete teams[teamId];
            return {
                ...state,
                byIds: {...teams},
                allIds: [...updatedAllIds]
<<<<<<< HEAD
            };
        }

        case DELETE_INVITATION: {
            const {userEmail, teamId} = action.payload;
            let updatedInvs = [...state.invitations];
            for(let i = 0; i < updatedInvs.length; i++) {
                if(updatedInvs[i].teamId === teamId) {
                    updatedInvs.splice(i, 1);
                    i--;
                }
            }
            return {
                ...state,
                invitations: updatedInvs
            };
        }

        case ADD_INV_LIST: {
            const {content} = action.payload;
            return {
                ...state,
                invitations: [...state.invitations, ...content]
=======
>>>>>>> 6ec0f7f (Progress - team deletion implemented)
            };
        }

        case ADD_MEMBER: {
            const {userId, teamId, accepted} = action.payload;
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
                teams[teamId].content.teamMembers.push({userId: userId, teamStatus: accepted})
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