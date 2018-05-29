import {
  CLOSE_TO_POI,
  url
} from "./constants"
import {Actions} from "react-native-router-flux";

//Exports

export function joinTeam (teamId, user){
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

export function leaveTeam (teamId, userId){
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

//Dispatchers

export function selectChallenge(team) {
  return {
    type: SELECTED_CHALLENGE,
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

function leaveTeam(res){
    return {
        type: LEAVE_TEAM,
        res: res,
        loading: false
    }
}
