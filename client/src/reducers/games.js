import {
  INIT_GAMES,
  LOADING
} from "../actions/constants"


const games = (state = [], action) => {
  switch (action.type) {
    case LOADING:
    return Object.assign({}, state, {
      ...state,
        byId: state.byId,
        loading: action.loading
    })
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
      id: game.id,
      name: game.name,
      QRcode: game.QRcode,
      nbChallenges: game.pois.lenght
    }
  })
  return gameList;
}

export default games
