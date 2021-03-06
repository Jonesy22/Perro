import { ADD_USER, ADD_TEAM_TO_USER, REMOVE_TEAM_FROM_USER } from "../actionTypes.js";
import { createUser } from "../createObjects.js";

const initialState = {
    allIds: [0,1,2,3], // list of ids of all the tasks that are loaded
    byIds: {
        //array at the end should be teamIds and should add once accepted flag is true
        0: {content :createUser("Kyler","Jacobson","jacobkyl@oregonstate.edu", [])},
        1: {content :createUser("Trevor","Jones","jonetrev@oregonstate.edu", [])}, 
        2: {content :createUser("Matthew","Levis","levism@oregonstate.edu", [])}, 
        3: {content :createUser("Daniel","Jones","jonesd5@oregonstate.edu", [])},  
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

        case ADD_TEAM_TO_USER: {
            const {userId, teamId} = action.payload;
            let users = {...state.byIds}
            if(userId < 0){
                console.log("User not found in Redux, need to query database")
            }
            else{
                users[userId].content.teams.push(teamId)
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
                    if(team[1] == teamId){
                        users[userId].content.teams.splice(index, 1) 
                    }
                }
            )
        }


        default:
            return state;
    }

}
    
    export default executeAction;