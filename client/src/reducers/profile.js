import {
  LOGGED_IN,
    ADMIN_LOGIN,
  CHOOSE_GAME,
  EDIT_GAME,
  NO_NETWORK,
  HAS_NETWORK
} from "../actions/constants"

nbTeams = 0;

const games = (state = [], action) => {
  switch (action.type) {
    case LOGGED_IN:
    return Object.assign({}, state, {
      ...state,
      userId: action._id,
      name: action.name,
      type: action.user_type,
      isEditing: false,
      isPlaying: false
    })
      case ADMIN_LOGIN:
          return Object.assign({}, state, {
              ...state,
              passwordMatched:action.res
          })
    case CHOOSE_GAME:
    return Object.assign({}, state, {
      ...state,
      isPlaying: action.gameId
    })
    case EDIT_GAME:
    return Object.assign({}, state, {
      ...state,
        isEditing: true,
        isPlaying: false
    })
    case NO_NETWORK:
    return Object.assign({}, state, {
      ...state,
        isOffline: true
    })
    case HAS_NETWORK:
    return Object.assign({}, state, {
      ...state,
        isOffline: false
    })

    //other actions
    default:
      return state;
  }
}

function listTeams(action){
  teamList = []
  action.forEach(function(team, index) {
    nbUsers = 0
    teamList[index] = {
      id: team._id,
      name: team.name,
      users: team.users,
      nbUsers: team.users.lenght,
      challenges: team.challenges,
      nbChallenges: team.challenges.lenght
    }
  })
  return teamList;
}

export default games
