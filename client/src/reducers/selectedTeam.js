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
        return Object.assign({}, state, {
            ...state,
            users: [...state.users, ...{
                _id: action.user.userId,
                name: action.user.name,
                MAC: action.user.mac,
            }],
            nbUsers: state.users.length,
            joined: true
        })
    case LEAVE_TEAM:
        return Object.assign({}, state, {
            joined: false
        })


    //other actions
    default:
      return state;
  }
}

function addUser(user) {
  act
}

export default selectedTeam
