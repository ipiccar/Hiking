import {
  LOGGED_IN,
    NEW_USER,
    ADMIN_LOGIN,
  CHOOSE_GAME,
  EDIT_GAME,
  NO_NETWORK,
  HAS_NETWORK,
  ALREADY_EXISTS
} from "../actions/constants"

nbTeams = 0;

const games = (state = [], action) => {
  switch (action.type) {
    case ALREADY_EXISTS:
    return Object.assign({}, state, {
      ...state,
      name: action.name,
      alreadyExists: action.alreadyExists,
      userType: action.userType
    })
    case LOGGED_IN:
    return Object.assign({}, state, {
      ...state,
      userId: action.userId,
      name: action.name,
      userType: action.userType,
      mac:action.mac,
      isEditing: false,
      isPlaying: false,
      alreadyExists: false
    })
      case ADMIN_LOGIN:
          return Object.assign({}, state, {
              ...state,
              passwordMatched:action.res
          })
    case CHOOSE_GAME:
    return Object.assign({}, state, {
      ...state,
      isPlaying: action.isPlaying
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
      case NEW_USER:
          return Object.assign({}, state, {
              ...state,
              res: action.res
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
