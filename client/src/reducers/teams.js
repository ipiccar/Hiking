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
            byId: [...state.byId, ...[{
              teamId: action.teamId,
              name: action.name,
              users: action.users,
              nbUsers: action.users.length,
              challenges: action.challenges,
              nbChalleneges: action.challenges.length,
              joined: true
            }]]
        })
    case JOIN_TEAM:
        return Object.assign({}, state, {
            ...state,
            byId: state.byId.map((team) => {
              if (team.teamId === action.teamId) {
                return Object.assign({}, team, {
                  ...team,
                  users: [...team.users, ...[{
                    _id: action.user.userId,
                    name: action.user.name,
                    MAC: action.user.mac,
                  }]],
                  nbUsers: team.nbUsers = team.nbUsers + 1,
                  joined: true
                })
              } else {
                return Object.assign({}, team, {
                  ...team,
                  users: team.users.filter((user, index) => user._id !== action.user.userId),
                  nbUsers: team.users.length,
                  joined: false
                })
              }
            })
        })
    case LEAVE_TEAM:
        return Object.assign({}, state, {
            ...state,
            byId: state.byId.map((team) => {
              if (team.teamId === action.teamId) {
                return Object.assign({}, team, {
                  users: team.users.filter((user, index) => user._id !== action.user.userId),
                  nbUsers: team.nbUsers = team.nbUsers - 1,
                  joined: false
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
                  displayed: action.displayed
                })
              } else {
                return Object.assign({}, team, {
                  displayed: !action.displayed
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
