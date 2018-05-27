import { combineReducers } from 'redux';
import { DATA_AVAILABLE, LOADING, INIT_GAMES } from "../actions/constants" //Import the actions types constant we defined in our actions
import routes from "./routes"
import games from "./games"

let dataState = { data: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
          state = Object.assign({}, state, {
            data: action.data,
            loading:false });
          return state;
        case LOADING:
        state = Object.assign({}, state, {
          ...state,
          loading: action.loading });
          return state;
        case INIT_GAMES:
        state = Object.assign({}, state, {
          ...state,
          loading: action.loading });
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
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;
