import {
  CHOOSE_GAME
} from "../actions/constants"


const games = (state = [], action) => {
  switch (action.type) {
    case CHOOSE_GAME:
    return Object.assign({}, state, {
      ...state,
        id: action._id,
        name: action.name,
        QRcode: action.QRcode,
        pointsOfInterest: action.pois,
        nbPointsOfInterest: action.pois.lenght,
        gameMasters: action.gms,
        nbGameMasters: action.gms.lenght,
        isRunning: false
    })
    //other actions
    default:
      return state;
  }
}

export default games
