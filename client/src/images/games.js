import {
  INIT_GAMES,
  LOADING
} from "../actions/constants";

//Reducer to display game lists

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
  action.forEach(function(game, index) {
    gamesList[index] = {
      id: game._id,
      name: game.name,
      QRcode: game.QRcode,
      nbChallenges: game.pois.lenght
    }
  })
  return gamesList;
}


export default games
