import {
  SELECT_CHALLENGE,
  url
} from "./constants"
import {Actions} from "react-native-router-flux";

//Exports

export function completeChallenge (teamId, user){
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


//Dispatchers

export function selectChallenge(challenge) {
  return {
    type: SELECTED_CHALLENGE,
    challengeId: challenge._id,
    poiId: challenge.poiId,
    name: challenge.name,
    type: challenge.type,
    var: challenge.var,
    isDone: false,
    pointsWon: challenge.pointsWon,
    penalityTime: challenge.penalityTime,
    inRange: true
  }
}

function isFetching(){
  return {
    type: LOADING,
    loading: true
  }
}
