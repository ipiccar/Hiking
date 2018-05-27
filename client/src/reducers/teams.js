import {
  INIT_TEAMS,
  CHOOSE_GAME
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
        nbTeams: action.lenght
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
