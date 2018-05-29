import {
  DISPLAY_TEAM,
  CHOOSE_TEAM,
  LOADING,
  CHOOSE_GAME,
  JOIN_TEAM,
  LEAVE_TEAM,
  PLAYER_REFRESH,
  url
} from "./constants"
import {Actions} from "react-native-router-flux";

const isRefreshing = false;
const isOnline = true;
const teamId = '';
const gameId = '';

responses = {
  teamUpdate: '',
  gameUpdate: '',
  notificationsUpdate: ''
}

export function launchRefresh(gameId, teamId){
  console.log("at launcher");
  this.teamId = teamId;
  this.gameId = gameId;

  requests = {
    teamUpdate: url+'teams/'+ teamId,
    gameUpdate: url+'games/' + gameId,
    notificationsUpdate: url+'notifications/game/' + gameId,
  }
  isRefreshing = true;
  console.log("I launch refresh");
  return function (dispatch) {
    sendRefresh(requests, dispatch);
  };
}

function sendRefresh(requests, dispatch) {
  return new Promise((resolve, reject) => {
        console.log('NEW_PROMISE');
        let timer = setInterval(function() {
          console.log('TIMER');
          console.log(timer);

          while (isRefreshing && isOnline ) {

            fetch(requests.teamUpdate)
            .then(response => {
              console.log(response.json());
              responses.teamUpdate = response.json()
              console.log(responses);
            })
            .then(fetch(requests.gameUpdate))
            .then(response => {
              console.log(response.json());
              responses.gameUpdate = response.json()
              console.log(responses);
            })
            .then(fetch(requests.notificationsUpdate))
            .then(response => {
              console.log(response.json());
              responses.notificationsUpdate = response.json()
              console.log(responses);
            })
            .then(promiseAll(responses, dispatch))
            .catch(() => {
                clearInterval(timer);
            });
          }
            console.log('ALL_SENT');
            console.log(promises);
            clearInterval(timer);
        }, 5000)
  })
}

function promiseAll(promises, dispatch){
  Promise.all(promises)
  .then(responses => {
    console.log('RAW_JSON_RESPONSES');
    console.log(responses);
  })
  .then((response) => {
    console.log(response);
    dispatch(totalRefresh(response))
  })
}

//Dispatchers

function totalRefresh(responses){
  return {
    type: PLAYER_REFRESH,
    teamUpdate: responses.teamUpdate,
    gameUpdate: responses.gameUpdate,
    notificationsUpdate: responses.notificationsUpdate
  }
}
