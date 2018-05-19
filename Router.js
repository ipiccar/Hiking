import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import { LoginForm, MapActivity, LegendActivity } from './src/components'

const RouterComponent = () => {
    return(
        <Router>
            <Stack key="root">
                <Scene key="login" component={LoginForm} title="Login" initial/>
                <Scene key="map" component={MapActivity} title="Map" />
                <Scene key="legend" component={LegendActivity} title="Legend"/>
            </Stack>
        </Router>
    );
};

export default RouterComponent;