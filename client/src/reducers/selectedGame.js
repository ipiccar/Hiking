import {
  LOADING,
  CHOOSE_GAME,
  NO_SUCH_GAME,
  REFRESH_GAME
} from "../actions/constants"


const selectedGame = (state = [], action) => {
  switch (action.type) {
    case LOADING:
    return Object.assign({}, state, {
      ...state,
        hasGame: action.hasGame
    })
    case CHOOSE_GAME:
    return Object.assign({}, state, {
      ...state,
        gameId: action.gameId,
        name: action.name,
        description: action.description,
        pointsOfInterest: action.pois,
        nbPointsOfInterest: action.pois.length,
        gameMasters: action.gms,
        nbGameMasters: action.gms.length,
        hasGame: action.hasGame,
        isRunning: false
    })
    case NO_SUCH_GAME:
    return Object.assign({}, state, {
      ...state,
        hasGame: action.hasGame
    })
    case REFRESH_GAME:
    return Object.assign({}, state, {
      ...state,
        gameId: action.gameId,
        name: action.name,
        description: action.description,
        pointsOfInterest: action.pois,
        nbPointsOfInterest: action.pois.length,
        gameMasters: action.gms,
        nbGameMasters: action.gms.length,
        hasGame: action.hasGame,
        isRunning: true
    })
    //other actions
    default:
      return state;
  }
}

export default selectedGame
