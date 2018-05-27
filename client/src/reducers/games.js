import {
  INIT_GAMES
} from "../actions/constants"


const games = (state = [], action) => {
  switch (action.type) {
    case INIT_GAMES:
    return Object.assign({}, state, {
      ...state,
        byId: listGames(action)
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
