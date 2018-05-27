import React from 'react'
import {ImageBackground, TouchableOpacity, View} from "react-native";
import { IgnMap } from "../components"
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


class MapActivity extends React.Component {
    state = {
        //urlTemplate: 'http://www.ngi.be/cartoweb/1.0.0/topo/default/3812/{z}/{y}/{x}.png',
        urlTemplate: 'http://www.ngi.be/cartoweb/1.0.0/topo/default/3857/{z}/{y}/{x}.png',
        //offlineUrlTemplate: `${FileSystem.documentDirectory}tiles/{z}/{x}/{y}.png`,
        mapRegion: undefined,
        isOffline: false,
    }

    handleMapRegionChange = mapRegion => {
        this.setState({
            mapRegion
        })
    }

    render() {
        const { isOffline } = this.state
        const {routes} = this.context;
        /*const urlTemplate = isOffline
        ? this.state.offlineUrlTemplate
        : this.state.urlTemplate*/
        const urlTemplate = this.state.urlTemplate
        return (
            <View style={styles.container}>
                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={{
                            borderWidth:1,
                            borderColor:'rgba(0,0,0,0.2)',
                            alignItems:'center',
                            justifyContent:'center',
                            width:80,
                            height:80,
                            backgroundColor:'#5B343C',
                            borderRadius:100,
                        }}
                    >
                        <ImageBackground source={require('../images/success.png')} style={{width:45, height:45}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth:1,
                            borderColor:'rgba(0,0,0,0.2)',
                            alignItems:'center',
                            justifyContent:'center',
                            width:80,
                            height:80,
                            backgroundColor:'#516C69',
                            borderRadius:100,
                        }}
                        onPress={Actions.legend}
                    >
                        <ImageBackground source={require('../images/success.png')} style={{width:45, height:45}}/>
                    </TouchableOpacity>
                </View>


                <IgnMap
                    onRegionChange = {this.handleMapRegionChange}
                    urlTemplate = {urlTemplate}>
                </IgnMap>
            </View>
        )
    }
}


const styles = {
    actionContainer: {
        flexDirection: 'row',
        padding: 15,
        //paddingTop: Constants.statusBarHeight + 15,
        zIndex: 999,
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    container: {
        flex: 1
    }
}

const mapStateToProps = (state, ownProps) => ({
  routes: state.routes,
  games: state.games
})

export default connect(mapStateToProps)(MapActivity)
