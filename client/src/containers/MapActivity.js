import React from 'react'
import {ImageBackground, TouchableOpacity, View, Dimensions} from "react-native";
import { IgnMap, CustomMarker } from "../components"
import MarkerSideMenu from "../components/MarkerSideMenu"
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Marker } from 'react-native-maps';
import Drawer from 'react-native-drawer';

import LegendActivity from './LegendActivity';

import marker_dark1 from '../images/marker_dark1.png';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 50.227414;
const LONGITUDE = 5.346877;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;


class MapActivity extends React.Component {

  constructor(){
    super();
    this.state = {
      //urlTemplate: 'http://www.ngi.be/cartoweb/1.0.0/topo/default/3812/{z}/{y}/{x}.png',
      urlTemplate: 'http://www.ngi.be/cartoweb/1.0.0/topo/default/3857/{z}/{y}/{x}.png',
      //offlineUrlTemplate: `${FileSystem.documentDirectory}tiles/{z}/{x}/{y}.png`,
      mapRegion: undefined,
      isOffline: false,
      profile: {
        type: 'GM',
        isEditing: true,
        isOffline: false
      },
      toggled: false
    }
  }

    handleMapRegionChange = mapRegion => {
        this.setState({
            mapRegion
        })
    }

    toggleDrawer() {
      this.state.toggled ? this._drawer.close() : this._drawer.open();
    }

    closeDrawer(){
      this.setState({toggled:false});
    };


    openDrawer(){
      this.setState({toggled:true});
    };

    render() {
        const { isOffline } = this.state.profile.isOffline;
        const { routes } = this.context;
        /*const urlTemplate = isOffline
        ? this.state.offlineUrlTemplate
        : this.state.urlTemplate*/
        const urlTemplate = this.state.urlTemplate

        if (this.state.profile.type == "GM" && this.state.profile.isEditing) {
          return (
            <View style={styles.container}>
                <Drawer
                  type="displace"
                  ref={(ref) => { this._drawer = ref; }}
                  content={<LegendActivity/>}
                  onClose={this.closeDrawer.bind(this)}
                  onOpen={this.openDrawer.bind(this)}
                  panOpenMask={0.10}
                  panCloseMask={0.20}
                  captureGestures
                  side="right"
                  negotiatePan = {true}
                >
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
                          onPress={Actions.legend}
                      >
                          <ImageBackground source={require('../images/icon_pin_white.png')} style={{width:26, height:45}}/>
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
                      >
                          <ImageBackground source={require('../images/icon_validate_white.png')} style={{width:45, height:33}}/>
                      </TouchableOpacity>
                  </View>

                  <IgnMap
                      onRegionChange = {this.handleMapRegionChange}
                      urlTemplate = {urlTemplate}>
                  </IgnMap>
                </Drawer>
              </View>
          )
        } else if (this.state.profile.type == "GM" && !this.state.profile.isEditing) {
          return (

              <View style={styles.container}>
                <Drawer
                  type="displace"
                  ref={(ref) => { this._drawer = ref; }}
                  content={<LegendActivity/>}
                  onClose={this.closeDrawer.bind(this)}
                  onOpen={this.openDrawer.bind(this)}
                  panOpenMask={0.10}
                  panCloseMask={0.20}
                  captureGestures
                  side="right"
                  negotiatePan = {true}
                >

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
                          <ImageBackground source={require('../images/icon_notification_white.png')} style={{width:38, height:45}}/>
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
                      >
                          <ImageBackground source={require('../images/icon_leaderboard_white.png')} style={{width:45, height:33}}/>
                      </TouchableOpacity>
                  </View>
                  <IgnMap
                      onRegionChange = {this.handleMapRegionChange}
                      urlTemplate = {urlTemplate}>
                      <Marker
                       coordinate={{
                          latitude: LATITUDE + SPACE,
                          longitude: LONGITUDE - SPACE,
                        }}
                        centerOffset={{ x: -42, y: -60 }}>
                          <CustomMarker type="type1"/>
                        </Marker>
                  </IgnMap>
                  </Drawer>
              </View>
          )
        }

    }
}

const drawerStyles = {
    drawer: {
        height:"100%",width:200,shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 1
    },
    main: { paddingLeft: 0 }
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
  profile: state.profile,
  selectedGame: state.selectedGame,
  teams: state.teams
})

export default connect(mapStateToProps)(MapActivity)
