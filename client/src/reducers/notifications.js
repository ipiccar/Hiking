import {
  INIT_NOTIFICATIONS
} from "../actions/constants"


const selectedGame = (state = [], action) => {
  switch (action.type) {
    case INIT_NOTIFICATIONS:
    return Object.assign({}, state, {
      ...state,
        notificationId: action.notificationId,
        description: action.description,
        timestamp: action.timestamp,
        teams: action.teams
    })
    //other actions
    default:
      return state;
  }
}

export default selectedGame
