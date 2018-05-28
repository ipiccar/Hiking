import {
  INIT_TEAMS,
  CHOOSE_GAME,
    FETCH_TEAMS,
    NEW_TEAM,
    LEAVE_TEAM,
    JOIN_TEAM
} from "../actions/constants"

nbTeams = 0;

const games = (state = [], action) => {
  switch (action.type) {
    case CHOOSE_GAME:
    return Object.assign({}, state, {
      ...state,
      gameId: action.gameId
    })
    case INIT_TEAMS:
    return Object.assign({}, state, {
      ...state,
        byId: listTeams(action, state.gameId),
        nbTeams: action.length
    })
      case FETCH_TEAMS:
          return Object.assign({}, state, {
              ...state,
              state.byId.map(team=>)
              response: action.response
          })
      case NEW_TEAM:
          return Object.assign({}, state, {
              ...state,
              response: action.response
          })
      case JOIN_TEAM:
          return Object.assign({}, state, {
              ...state,
              res: action.res
          })
      case LEAVE_TEAM:
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
