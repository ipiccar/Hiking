import {
    INIT_NOTIFICATIONS,
    url
} from "./constants"
import {Actions} from "react-native-router-flux";

export function initNotifications(gameId){
    return function(dispatch) {

        console.log(gameId);
        fetch(url + 'notifications/game/' + gameId)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Response received : ");
                console.log(responseJson);

                if(responseJson[0].gameId!=undefined){
                  //Notification defined
                    console.log("Notification defined");
                    dispatch(displayNotifications(responseJson));
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

function displayNotifications(response){
  return {
    type: INIT_NOTIFICATIONS,
    notifications: response
  }
}
