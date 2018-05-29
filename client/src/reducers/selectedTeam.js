import {
    INIT_TEAMS,
    LEAVE_TEAM,
    JOIN_TEAM,
    DISPLAY_TEAM
} from "../actions/constants"

nbTeams = 0;

const selectedTeam = (state = [], action) => {
  switch (action.type) {
    case INIT_TEAMS:
        return Object.assign({}, state, {
            joined: false
        })
    case DISPLAY_TEAM:
        return Object.assign({}, state, {
            ...state,
            teamId: action.team.teamId,
            name: action.team.name,
            users: action.team.users,
            nbUsers: action.team.nbUsers,
            challenges: action.team.challenges,
            nbChallenges: action.team.nbChallenges
        })
        case JOIN_TEAM:
            console.log(state.users);
            console.log(action);
            return Object.assign({}, state, {
                ...state,
                users: [...state.users, ...[{
                  _id: action.user.userId,
                  name: action.user.name,
                  MAC: action.user.mac,
                }]],
                nbUsers: state.nbUsers = state.nbUsers + 1 ,
                joined: true
            })
    case LEAVE_TEAM:
        userIndex = null;

        /*const users = state.users.map((user, index) => {
          if (user._id !== action.user.userId){
            console.log(user._id+" stays");
            return user
          } else {
            console.log(index + " leaves");
            userIndex = index
          }
        })
        delete users[userIndex]*/

        state = Object.assign({}, state, {
          ...state,
          users: state.users.filter((user, index) => user._id !== action.user.userId),
          nbUsers: state.nbUsers = state.nbUsers - 1,
          joined: false
        })

        return state


    //other actions
    default:
      return state;
  }
}

function getIndex(tab, id){
  tab.findIndex(function(item, i){
    console.log(item._id == id);
		return item._id == id
	});
}

function addUser(user) {
  act
}

export default selectedTeam
