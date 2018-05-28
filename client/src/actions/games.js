import {
  INIT_GAMES,
    GAME_INFOS,
  LOADING,
  url
} from "./constants"
import {Actions} from "react-native-router-flux";

const myRequest = new Request(url+'/game', {method: 'GET'});

//Exports

export function getGames() {
  return function (dispatch) {

    // Display loader
    dispatch(isFetching());

    fetch(myRequest)
          .then(response => {
              if (response.status === 200) {
                  return response.json();
              } else {
                  throw new Error('Something went wrong on api server!');
              }
          })
          .then(response => {
              console.log("response : ", response);
              console.debug(response);

              //update games list
              dispatch(gamesFetched(response));
          }).catch(error => {
          console.error(error);
      });
  }
}

export function getGameInfos(gameId) {
    return function (dispatch) {
        // Display loader
        dispatch(isFetching());
        console.log("accessing : "+ url + 'games/' + gameId);
        fetch(url + 'games/' + gameId)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Response received : " + responseJson);
                dispatch(gameFetched(responseJson));
            })
            .catch((error) => {
                console.error(error);
            });
    }
}


//Dispatchers

export function chooseGame(gameId) {
  return {
    type: CHOOSE_GAME,
    gameId: gameId
  }
}

function isFetching(){
  return {
    type: LOADING,
    loading: true
  }
}

function gamesFetched(response){
  return {
    type: INIT_GAMES,
    response: response,
    loading: false
  }
}

function gameFetched(response){
    return {
        type: GAME_INFOS,
        response: response,
        loading: false
    }
}
