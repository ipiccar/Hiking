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

export function create_team (teamName, gameId, userId){
    return function(dispatch) {

        dispatch(isFetching());
        fetch(url + 'teams/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teamName: teamName,
                gameId: gameId,
                userId: userId
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(createTeam(responseJson));
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

function createTeam(response){
    return {
        type: NEW_TEAM,
        response: response,
        loading: false
    }
}
