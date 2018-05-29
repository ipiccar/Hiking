import React from 'react';
import { Provider, connect } from 'react-redux';
import { Scene, Router, Stack, Actions, Drawer } from 'react-native-router-flux';
import Main from './src/containers/Main';
import LegendActivity from './src/containers/LegendActivity';
import JoinGame from "./src/containers/JoinGame";
import GameDetails from "./src/containers/GameDetails";
import TeamList from "./src/containers/TeamList";
import WaitingRoom from "./src/containers/WaitingRoom";
import PlayerList from "./src/containers/PlayerList";
import MapActivity from "./src/containers/MapActivity";
import Login from "./src/containers/Login";
import AdminMain from "./src/containers/AdminMain";

const RouterWithRedux = connect()(Router);

const RouterComponent = ({ store }) => {
    return(
      <Provider store={store}>
        <RouterWithRedux>
          <Router>
              <Stack key="root">
                  <Scene key="main" component={Main} title="Welcome" hideNavBar={true} />
                  <Scene key="login" component={Login} title="Login" hideNavBar={true}/>
                  <Scene key="adminMain" component={AdminMain} title="Main" hideNavBar={true} />
                  <Scene key="scan" component={JoinGame} title="Scan" hideNavBar={true} />
                  <Scene key="gdetail" component={GameDetails} title="Game Details" hideNavBar={true} />
                  <Scene key="teamList" component={TeamList} title="Team List" hideNavBar={true}/>
                  <Scene key="players" component={PlayerList} title="Player List" hideNavBar={true} />
                  <Scene key="waitingroom" component={WaitingRoom} title="Waiting Room" hideNavBar={true} />
                  <Scene key="map" component={MapActivity} title="Map" hideNavBar={true} initial/>
                  <Scene key="legend" component={LegendActivity} title="Legend" hideNavBar={true}/>
              </Stack>
          </Router>
        </RouterWithRedux>
      </Provider>
    );
};

export default RouterComponent;
