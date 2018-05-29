import {
  SELECT_GAME,
  LOADING,
  NO_SUCH_GAME,
  CHOOSE_GAME,
  url
} from "./constants"
import {Actions} from "react-native-router-flux";

const myRequest = new Request(url+'game', {method: 'GET'});

//Exports

export function initGame(gameId) {
    return function (dispatch) {
        // Display loader
        dispatch(isFetching());
        console.log("accessing : "+ url + 'games/' + gameId);
        fetch(url + 'games/' + gameId)
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson._id != undefined) {
                console.log("Response received : ");
                console.log(responseJson);
                dispatch(chooseGame(responseJson));
                Actions.gdetail();
              } else {
                console.log("No such game");
                dispatch(noSuchGame());
              }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}


//Dispatchers

function chooseGame(response) {
  return {
    type: CHOOSE_GAME,
    gameId: response._id,
    name: response.name,
    description: response.description,
    pois: response.pois,
    gms: response.gms,
    loading: false,
    hasGame: true
  }
}

function noSuchGame(){
  return {
    type: NO_SUCH_GAME,
    hasGame: false,
    loading: false
  }
}

function isFetching(){
  return {
    type: LOADING,
    loading: true
  }
}
