import {
    INIT_TEAMS,
    LEAVE_TEAM,
    JOIN_TEAM,
    DISPLAY_TEAM,
    PLAYER_REFRESH,
    NEW_TEAM
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
        return Object.assign({}, state, {
            ...state,
            users: state.users.filter( (user, index) => user._id !== action.user.userId),
            joined: false
        })
    case PLAYER_REFRESH:
        return Object.assign({}, state, {
          ...state,
            response: action.teamUpdate
        })
    case NEW_TEAM:
        return Object.assign({}, state, {
          ...state,
              teamId: action.teamId,
              name: action.name,
              users: action.users,
              nbUsers: action.users.length,
              challenges: action.challenges,
              nbChallenges: action.challenges.length,
              joined: true
        })

    //other actions
    default:
      return state;
  }
}

export default selectedTeam
