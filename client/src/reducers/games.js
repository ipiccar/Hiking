import {
  INIT_GAMES,
    GAME_INFOS
} from "../actions/constants"


const games = (state = [], action) => {
  switch (action.type) {
    case INIT_GAMES:
    return Object.assign({}, state, {
      ...state,
        byId: listGames(action)
    })
      case GAME_INFOS:
          return Object.assign({}, state, {
              ...state,
              response: action.response
          })
    //other actions
    default:
      return state;
  }
}

function listGames(action){
  gameList = []
  action.forEach(function(game,index){
    gameList[index] = {
      id: game._id,
      name: game.name,
      QRcode: game.QRcode,
      nbPointsOfInterest: game.pois.lenght
    }
  })
  return gameList;
}

export default games
