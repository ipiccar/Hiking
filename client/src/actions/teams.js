import {
    LOADING,
    INIT_TEAMS,
    NEW_TEAM,
    DISPLAY_TEAM_MEMBERS,
    url
} from "./constants"

export function fetch_teams (gameId){
  console.log(gameId);
    return function(dispatch) {

        dispatch(isFetching());
        fetch(url + 'teams/game/' + gameId)
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
                dispatch(teamsFetched(responseJson));
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

function isFetching(){
    return {
        type: LOADING,
        loading: true
    }
}

function teamsFetched(response){
    return {
        type: INIT_TEAMS,
        byId: response,
        loading: false
    }
}
