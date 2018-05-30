import {
  INIT_NOTIFICATIONS
} from "../actions/constants"


const selectedGame = (state = [], action) => {
  switch (action.type) {
    case INIT_NOTIFICATIONS:
    return Object.assign({}, state, {
      ...state,
      byId : action.notifications.map((notification) => {
        return Object.assign({}, notification, {
          notificationId: notification._id,
          description: notification.description,
          timestamp: notification.timestamp,
          teams: notification.teams
        })
      }),
    })
    //other actions
    default:
      return state;
  }
}

export default selectedGame
