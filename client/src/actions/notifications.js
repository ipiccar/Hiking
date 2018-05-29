import {
    INIT_NOTIFICATION,
    url
} from "./constants"
import {Actions} from "react-native-router-flux";

export function initNotifications(gameId){
    return function(dispatch) {

        dispatch(isFetching());
        console.log(gameId);
        fetch(url + 'notifications/game/' + gameId)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Response received : ");
                console.log(responseJson);

                if(responseJson._id!=undefined){
                  //Notification defined
                    console.log("Notification defined");
                    dispatch(initNotifications(responseJson));
                } else {
                  //No notifications
                  console.log("No notifications");
                }

            })
            .catch((error) => {
                console.error(error);
            });

    }
}

//Dispatchers

function initNotifications(response){
  return {
    type: INIT_NOTIFICATIONS,
    notificationId: response._id,
    description: response.description,
    timestamp: response.timestamp,
    teams: response.teams
  }
}
