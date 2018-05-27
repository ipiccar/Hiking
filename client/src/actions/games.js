import {
  INIT_GAMES,
  LOADING,
  url
} from "./constants"

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
