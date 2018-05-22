import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import { LoginForm, MapActivity, LegendActivity } from './src/components'
import {JoinGame} from "./src/components/JoinGame";
import {GameDetails} from "./src/components/GameDetails";
import {TeamList} from "./src/components/TeamList";
import {WaitingRoom} from "./src/components/WaitingRoom";
import {PlayerList} from "./src/components/PlayerList";

const RouterComponent = () => {
    return(
        <Router>
            <Stack key="root">
                <Scene key="login" component={LoginForm} title="Login" hideNavBar={true}/>
                <Scene key="scan" component={JoinGame} title="Scan" hideNavBar={true} />
                <Scene key="gdetail" component={GameDetails} title="Game Details" hideNavBar={true} />
                <Scene key="teamList" component={TeamList} title="Team List" hideNavBar={true} />
                <Scene key="playerList" component={PlayerList} title="Player List" hideNavBar={true} />
                <Scene key="waitingroom" component={WaitingRoom} title="Waiting Room" hideNavBar={true}/>
                <Scene key="map" component={MapActivity} title="Map" initial />
                <Scene key="legend" component={LegendActivity} title="Legend"/>
            </Stack>
        </Router>
    );
};

export default RouterComponent;