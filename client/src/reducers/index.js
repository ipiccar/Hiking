import { combineReducers } from 'redux';
import routes from "./routes"
import games from "./games"
import teams from "./teams"
import selectedGame from "./selectedGame"
import {
  DATA_AVAILABLE,
  LOADING,
  INIT_GAMES,
  INIT_TEAMS
} from "../actions/constants" //Import the actions types constant we defined in our actions


let dataState = { data: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
          state = Object.assign({}, state, {
            data: action.data,
            loading:false
          });
          return state;
        case LOADING:
          state = Object.assign({}, state, {
            ...state,
            loading: action.loading
          });
          return state;
        case INIT_GAMES:
          state = Object.assign({}, state, {
            ...state,
            loading: action.loading
          });
          return state;
        case INIT_TEAMS:
          state = Object.assign({}, state, {
            ...state,
            loading: action.loading
          });
          return state;
        default:
          return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer,
  routes,
  games,
  teams,
  selectedGame
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;
