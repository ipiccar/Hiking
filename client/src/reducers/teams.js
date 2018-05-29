import {
  INIT_TEAMS,
  CHOOSE_GAME,
    FETCH_TEAMS,
    NEW_TEAM,
    LEAVE_TEAM,
    JOIN_TEAM,
    DISPLAY_TEAM
} from "../actions/constants"

nbTeams = 0;

const games = (state = [], action) => {
  switch (action.type) {
    case INIT_TEAMS:
        return Object.assign({}, state, {
          ...state,
            byId: listTeams(action),
            nbTeams: action.byId.length
        })
    case NEW_TEAM:
        return Object.assign({}, state, {
            ...state,
            byId: [...state.byId, ...action.team]
        })
    case JOIN_TEAM:
        return Object.assign({}, state, {
            ...state,
            byId: state.byId.map((team) => {
              if (team.id === action.teamId) {
                return Object.assign({}, team, {
                  ...team,
                  users: team.users.push({
                    _id: action.user.userId,
                    name: action.user.name,
                    MAC: action.user.mac
                  }),
                  nbUsers: state.users.length,
                })
              } else {
                return team
              }
            })
        })
    case LEAVE_TEAM:
        return Object.assign({}, state, {
            ...state,
            byId: state.byId.map((team) => {
              if (team.id === action.teamId) {
                return Object.assign({}, team, {
                  users: team.users.map((user) => {
                    if (user._id !== action.userId){
                      return user;
                    }
                  })
                })
              } else {
                return team;
              }
            })
        })
    case DISPLAY_TEAM:
        return Object.assign({}, state, {
            ...state,
            byId: state.byId.map((team) => {
              if (team.id === action.team.teamId) {
                return Object.assign({}, team, {
                  displayed: action.selected
                })
              } else {
                return Object.assign({}, team, {
                  displayed: !action.selected
                })
              }
            })
        })

    //other actions
    default:
      return state;
  }
}

function listTeams(action){
  teamList = []
  action.byId.forEach(function(team, index) {
    teamList[index] = {
      teamId: team._id,
      name: team.name,
      users: team.users,
      nbUsers: team.users.length,
      challenges: team.challenges,
      nbChallenges: team.challenges.length,
      selected: false,
    }
  })
  return teamList;
}

export default games
