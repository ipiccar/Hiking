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

//Exports

export function joinTeam (teamId, user){
console.log("JOIN TEAM");
    return function(dispatch) {

        dispatch(isFetching());
        fetch(url + 'teams/join/', {
            method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.userId,
                teamId: teamId
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson) {
                console.log("got a response from server");

                dispatch(joinedTeam(teamId, user));
              } else {
                console.log(user.name + " Didn't join team");
              }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export function leaveTeam (teamId, user){
    return function(dispatch) {

        dispatch(isFetching());
        console.log(teamId);
        console.log(user);
        fetch(url + 'teams/leave/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.userId,
                teamId: teamId
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson) {
                console.log("got a response from server");

                dispatch(leftTeam(teamId, user));
              } else {
                console.log(user.name + " Didn't left the team");
              }
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export function create_team (teamName, gameId, userId){
    console.log(teamName);
    console.log(gameId);
    console.log(userId);
    return function(dispatch) {

        dispatch(isFetching());
        fetch(url + 'teams/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: teamName,
                gameId: gameId,
                userId: userId
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson._id) {
                console.log("got a response from server");
                console.log(responseJson);
                dispatch(createdTeam(responseJson));
              } else {
                console.log(responseJson);
                console.log(teamName + " Didn't left the team");
              }

            })
            .catch((error) => {
                console.error(error);
            });
    }
}

//Dispatchers

export function displayTeam(team) {
  return {
    type: DISPLAY_TEAM,
    team: team,
    displayed: true
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

function joinedTeam(teamId, user){
    return {
        type: JOIN_TEAM,
        teamId: teamId,
        user: user,
        loading: false
    }
}

function leftTeam(teamId, user){
    return {
        type: LEAVE_TEAM,
        teamId: teamId,
        user: user,
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
