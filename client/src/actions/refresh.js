import {
  PLAYER_REFRESH,
  REFRESH_GAME,
  url
} from "./constants"
import {Actions} from "react-native-router-flux";

const isRefreshing = false;
const isOnline = true;
const teamId = '';
const gameId = '';

let promises = [];

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
          refreshGame(gameId);

        }, 1000)
  })
}
/*
function sendRefresh(requests, dispatch) {
  return new Promise((resolve, reject) => {
        console.log('NEW_PROMISE');
        let timer = setInterval(function() {
          console.log('TIMER');
          console.log(timer);
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
            console.log('ALL_SENT');
            console.log(promises);
            clearInterval(timer);
        }, 1000)
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
*/

function refreshGame(gameId) {
    return function (dispatch) {
        // Display loader
        console.log("accessing : "+ url + 'games/' + gameId);
        fetch(url + 'games/' + gameId)
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson._id != undefined) {
                console.log("Response received : ");
                console.log(responseJson);
                dispatch(refreshGame(responseJson));
                Actions.gdetail();
              } else {
                console.log("No such game");
              }

            })
            .catch((error) => {
                console.error(error);
            });
        }
}

//Dispatchers

function refreshGame(response) {
  return {
    type: REFRESH_GAME,
    gameId: response._id,
    name: response.name,
    description: response.description,
    pois: response.pois,
    gms: response.gms,
    hasGame: true
  }
}

function totalRefresh(responses){
  return {
    type: PLAYER_REFRESH,
    teamUpdate: responses.teamUpdate,
    gameUpdate: responses.gameUpdate,
    notificationsUpdate: responses.notificationsUpdate
  }
}
