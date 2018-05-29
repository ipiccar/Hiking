import {
    SELECTED_CHALLENGE,
    PLAYER_REFRESH
} from "../actions/constants"


const selectedChallenge = (state = [], action) => {
  switch (action.type) {
    case SELECTED_CHALLENGE:
        return Object.assign({}, state, {
            ...state,
            challengeId: action.challengeId,
            poiId: action.poiId,
            name: action.name,
            type: action.type,
            var: action.var,
            isDone: action.isDone,
            pointsWon: action.pointsWon,
            penalityTime: action.penalityTime,
            inRange: action.inRange
        })


    //other actions
    default:
      return state;
  }
}

export default selectedChallenge
