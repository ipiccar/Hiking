import {
  DISPLAY_TEAM,
  CHOOSE_TEAM,
  LOADING,
  CHOOSE_GAME,
  JOIN_TEAM,
  LEAVE_TEAM,
  url
} from "./constants"
import {Actions} from "react-native-router-flux";

const isRefreshing = false;
const isOnline = true;

export function launchRefresh(gameId, teamId){
  isRefreshing
  requests = {
    teamUpdate: url+'teams/'+teamId,
    gameUpdate: url+'games/' + gameId,
    notificationsUpdate: url+'notifications/' + gameId,
  }
  return function (dispatch) {
    sendRefresh(gameId, dispatch);
  };
}

function sendRefresh(gameId, dispatch) {
  return new Promise((resolve, reject) => {

    console.log('NEW_PROMISE');
    let timer = setInterval(function() {
      console.log('TIMER');
      console.log(timer);
      while (isRefreshing && isOnline) {
        let fetch = doFetch(request)
        .then(checkStatus)
        .then(parseJSON)
          dispatch(parseJSON)
        .catch(() => {
            clearInterval(timer);
        });
      }
        console.log('ALL_SENT');
        console.log(promises);
        clearInterval(timer);
    }, 1000)
  })
}

function doFetch(request) {
  console.log('DO_FETCH');
  console.log(request);
  return fetch(request)
}


//Dispatchers

function
