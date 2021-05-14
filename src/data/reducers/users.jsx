import { ADD_USER, ADD_TEAM_TO_USER, REMOVE_TEAM_FROM_USER, UPDATE_USERS_TEAMSTATUS, ADD_USER_LIST } from "../actionTypes.js";
import { createUser } from "../createObjects.js";

const initialState = {
    allIds: [], // [0,1,2,3], // list of ids of all the tasks that are loaded
    byIds: {
        //array at the end should be teamIds and should add once accepted flag is true
        // 0: {content :createUser("Kyler","Jacobson","jacobkyl@oregonstate.edu", [])},
        // 1: {content :createUser("Trevor","Jones","jonetrev@oregonstate.edu", [])}, 
        // 2: {content :createUser("Matthew","Levis","levism@oregonstate.edu", [])}, 
        // 3: {content :createUser("Daniel","Jones","jonesd5@oregonstate.edu", [])},  
    }
}

const executeAction = function(state = initialState, action) {
    switch (action.type) {
        case ADD_USER: {
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
        
        case ADD_USER_LIST: {
            const { content } = action.payload;
                return {
                ...state,
                allIds: [...state.allIds, ...Object.keys(content)],
                byIds: {
                    ...state.byIds,
                    ...content
                }
            };
        }

        case ADD_TEAM_TO_USER: {
            const {userId, teamId} = action.payload;
            let users = {...state.byIds}
            let dupCheck = false;
                if(userId < 0){
                    console.log("User not found in Redux, need to query database")
                }            
                else{
                    Object.entries(users[userId].content.teams).map(
                        (team) => {
                            if(team[1].teamId == teamId){
                                dupCheck = true;
                            }
                        }
                    )
                    if(dupCheck){
                        console.log("Member has already been added")
                    }
                    else{
        
                    users[userId].content.teams.push({teamId: teamId, teamStatus: false})
                }
            }

            return {
                ...state,
                byIds: {...users}
            };
        };

        case REMOVE_TEAM_FROM_USER: {
            const {userId, teamId} = action.payload;
            let users = {...state.byIds}
            Object.entries(users[userId].content.teams).map(
                (team,index) => {
                    if(team[1].teamId == teamId){
                        users[userId].content.teams.splice(index, 1) 
                    }
                }
            )
        }

        case UPDATE_USERS_TEAMSTATUS: {
            console.log("running USERS_TEAMSTATUS")
            const { userId, teamId } = action.payload;
            let users = {...state.byIds}
            Object.entries(users[userId].content.teams).map(
                (team) => {
                    if (team[1].teamId == teamId){
                        team[1].teamStatus = true;
                    }
                }
            )
            return {
                ...state,
                byIds: {...users}
            };
        }
        default:
            return state;
    }

}
    
    export default executeAction;