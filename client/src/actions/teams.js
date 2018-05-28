import {
    LOADING,
    FETCH_TEAMS,
    NEW_TEAM,
    JOIN_TEAM,
    LEAVE_TEAM,
    url
} from "./constants"

const myRequest = new Request(url+'/game', {method: 'GET'});

export function fetch_teams (gameId){
    return function(dispatch) {

        dispatch(isFetching());
        fetch(url + 'teams/game/' + gameId)
            .then((response) => response.json())
            .then((responseJson) => {
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

export function join_team (teamId, userId){
    return function(dispatch) {

        dispatch(isFetching());
        fetch(url + 'teams/join/', {
            method: 'POST',
                headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                teamId: teamId
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(joinTeam(responseJson));
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export function leave_team (teamId, userId){
    return function(dispatch) {

        dispatch(isFetching());
        console.log(teamId);
        console.log(userId);
        fetch(url + 'teams/leave/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                teamId: teamId
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(leaveTeam(responseJson));
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
        type: FETCH_TEAMS,
        response: response,
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

function joinTeam(res){
    return {
        type: JOIN_TEAM,
        res: res,
        loading: false
    }
}

function leaveTeam(res){
    return {
        type: LEAVE_TEAM,
        res: res,
        loading: false
    }
}