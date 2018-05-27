import { ActionConst } from 'react-native-router-flux';

const initialState = {
  scene: {},
};

const routes = (state = initialState, action) => {
  switch (action.type) {
    case ActionConst.FOCUS:
    console.log(action)
      return {
        ...state,
        scene: action.scene,
      };

    //other actions
    default:
      return state;
  }
}

export default routes
