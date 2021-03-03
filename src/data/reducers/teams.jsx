import InputForm from "../../components/InputForm.js";
import { ADD_TEAM, ADD_MEMBER} from "../actionTypes.js";
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
            const {userId, teamId, nextUserId,email} = action.payload;
            let teams = {...state.byIds}
            let dupCheck = false;

            Object.entries(teams[teamId].content.teamMembers).map(
                (member) => {
                    console.log("mapMemberId: "+(member[1].userId) + " map userId: " + userId)
                    if(member[1].userId == userId){
                        console.log("user has already been added")
                        dupCheck = true;
                    }
                }
            )
            if(dupCheck){
                console.log("Member has already been added")
            }
            else{
                if (userId < 0){
                    console.log("creating newUserId")
                    teams[teamId].content.teamMembers.push({userId: nextUserId, teamStatus: false})
                }
                else{
                    console.log("Teams : "+ JSON.stringify(teams));
                    teams[teamId].content.teamMembers.push({userId: userId, teamStatus: true})
                    console.log("Member added : "+ JSON.stringify(teams[teamId].content))
                }
            }
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