import React from 'react'
import {ImageBackground, TouchableOpacity, View, Dimensions, Text, Platform, PermissionsAndroid} from "react-native";
import { IgnMap, CustomMarker } from "../components"
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import  MapView, { Callout, Marker } from 'react-native-maps';
import Drawer from 'react-native-drawer';
import LegendActivity from "../containers/LegendActivity";
import marker_dark1 from '../images/marker_dark1.png';
import geolib from 'geolib';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 50.227414;
const LONGITUDE = 5.346877;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;


class MapActivity extends React.Component {
    state = {
        //urlTemplate: 'http://www.ngi.be/cartoweb/1.0.0/topo/default/3812/{z}/{y}/{x}.png',
        urlTemplate: 'http://www.ngi.be/cartoweb/1.0.0/topo/default/3857/{z}/{y}/{x}.png',
        //offlineUrlTemplate: `${FileSystem.documentDirectory}tiles/{z}/{x}/{y}.png`,
        mapRegion: undefined,
        isOffline: false,
        profile: {
          type: 'PLAYER',
          isEditing: false,
          isOffline: false
        },
        userLocation:undefined,
        selectedGame: {
            pois: [
                {
                    _id: "5b0c94d29296691b684ec0d4",
                    challengeId: "b0c950e9296691b684ec0d7",
                    name: "Montagne De Frites",
                    description: "Le bonheur commence ici",
                    coordX: 50.228467,
                    coordY: 5.342235,
                    notificationRange: 100,
                    notificationMessage: "Une avalanche de frites est en vue"
                },
                {
                    _id: "5b0c94da6e46a91b63465831",
                    challengeId: "5b0c951f6e46a91b63465833",
                    name: "L'art, l'art et encore l'art",
                    description: "Dessine moi comme une française",
                    coordX: 50.228716,
                    coordY: 5.335956,
                    notificationRange: 2000,
                    notificationMessage: "La tenue d'adam est autorisée"
                }
            ],
            _id: "5b0c9d1ba608981e518ba568",
            name: "GameOne",
            description: "Bon sang",
            QRcode: "",
            __v: 0
        }
    } 

    componentWillMount() {
        console.log("userlocation");
        navigator.geolocation.watchPosition((position) => {
            const userLocation = position.coords;
              this.setState({ userLocation });
          }, null, this.props.geolocationOptions);
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
        const {routes} = this.context;
        /*const urlTemplate = isOffline
        ? this.state.offlineUrlTemplate
        : this.state.urlTemplate*/
        const urlTemplate = this.state.urlTemplate

        if (this.state.profile.type == "GM" && this.state.profile.isEditing) {
          return (
              <View style={styles.container}>
                <Drawer
                          type="overlay"
                          ref={(ref) => { this._drawer = ref; }}
                          content={<LegendActivity/>}
                          onClose={this.closeDrawer.bind(this)}
                          onOpen={this.openDrawer.bind(this)}
                          panOpenMask={0.30}
                          panCloseMask={0.30}
                          captureGestures
                          side="right"
                          negotiatePan = {true}
                          styles="zIndex:2"
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
                          onPress={Actions.legend}
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
                          type="overlay"
                          ref={(ref) => { this._drawer = ref; }}
                          content={<LegendActivity/>}
                          onClose={this.closeDrawer.bind(this)}
                          onOpen={this.openDrawer.bind(this)}
                          panOpenMask={0.30}
                          panCloseMask={0.20}
                          captureGestures
                          side="right"
                          negotiatePan = {true}
                          styles="zIndex:2"
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
                          onPress={Actions.legend}
                      >
                          <ImageBackground source={require('../images/icon_leaderboard_white.png')} style={{width:45, height:33}}/>
                      </TouchableOpacity>
                  </View>


                  <IgnMap
                      onRegionChange = {this.handleMapRegionChange}
                      urlTemplate = {urlTemplate}>
                      {this.state.selectedGame.pois.map((poi)=>{
                        <Marker
                       coordinate={{
                          latitude: LATITUDE + SPACE,
                          longitude: LONGITUDE - SPACE,
                        }}
                        centerOffset={{ x: -42, y: -60 }}>
                          <CustomMarker type="type1"/>
                        </Marker>
                      })}
                      
                  </IgnMap>
                </Drawer>
              </View>
          )
        }
        else if (this.state.profile.type == "PLAYER") {
            return (
                <View style={styles.container}>
                  <Drawer
                            type="overlay"
                            ref={(ref) => { this._drawer = ref; }}
                            content={<LegendActivity/>}
                            onClose={this.closeDrawer.bind(this)}
                            onOpen={this.openDrawer.bind(this)}
                            panOpenMask={0.30}
                            panCloseMask={0.20}
                            captureGestures
                            side="right"
                            negotiatePan = {true}
                            styles={{zIndex:2}}
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
                            onPress={this.showNotifications}
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
                        {this.state.selectedGame.pois.map((poi)=>{
                            return (<Marker
                            key={poi._id}
                                coordinate={{latitude:poi.coordX, longitude:poi.coordY}}>
                                <CustomMarker type="type1"/>
                                {this.checkCloseEnough(poi) ?                                
                                    <MapView.Callout tooltip onPress={()=>this.startChallenge(poi)}>
                                    <View style={styles.bubble}>
                                        <Text style={{color:'#5B343C', fontSize:16}}>{poi.name}</Text>
                                        <Text style={{color:'#5B343C', fontSize:12}}>{poi.notificationMessage}</Text>
                                        <TouchableOpacity><Text>Start challenge !</Text></TouchableOpacity>
                                        </View>
                                </MapView.Callout> : 
                            <MapView.Callout tooltip>
                            <View style={styles.bubble}>
                                <Text style={{color:'#5B343C', fontSize:16}}>{poi.name}</Text>
                                <Text style={{color:'#5B343C', fontSize:12}}>You must be closer to see this challenge !</Text>
                                </View>
                        </MapView.Callout>
                    }
                            </Marker>);
                        })}
                    </IgnMap>
                  </Drawer>
                </View>
            )
          }
    }
/*
    {this.state.selectedGame.pois.map((poi)=>{
        console.log(poi.coordX);
        console.log(poi.coordY);
      <MapView.Marker                      
        coordinate={{
            latitude: poi.coordX + SPACE,
            longitude: poi.coordY - SPACE,
      }}
      centerOffset={{ x: -42, y: -60 }}>
        <Callout>
          <View style={{height:100, width:200}}>
              <Text>{poi.name}</Text>
              <Text>{poi.notificationMessage}</Text>
              <TouchableOpacity enable={this.checkCloseEnough(poi)}><Text>Start challenge !</Text></TouchableOpacity>
          </View>
        </Callout>
        
      </MapView.Marker>
    })} */

    showNotifications(){
        console.log("notifications");
        Actions.notifications();
    }

    startChallenge(poi){
        console.log("start challenge");
    }

    checkCloseEnough(poi){
        console.log("check");
        if(this.state.userLocation!=undefined){
            let distance = geolib.getDistance({latitude: poi.coordX, longitude: poi.coordY}, {latitude:this.state.userLocation.latitude, longitude:this.state.userLocation.longitude});
            console.log("distance : " + distance);
            return distance <= poi.notificationRange;
        }
        return false; 
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
    cardPoi:{
        height:160,
        width:160,
        backgroundColor: '#DED3BF',
        borderWidth:1,
        borderRadius:2,
        borderColor:'#5B343C',
        borderBottomWidth:0,
        shadowColor:'#000',
        shadowOffset:{width:0, height:2},
        shadowOpacity:0.1,
        shadowRadius:2,
        elevation:1,
        marginLeft:5,
        marginRight:5,
        marginTop:10
    },
    buttonContainer: {
        width:'70%',
        backgroundColor: '#5B343C',
        borderRadius: 30,
        alignSelf:'center'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '700'
    },
    container: {
        flex:1
      },
      bubble: {
        width: 210,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#DED3BF',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 6,
        borderColor: '#5B343C',
        borderWidth: 0.5,
      }
}

const mapStateToProps = (state, ownProps) => ({
  routes: state.routes,
  profile: state.profile,
  selectedGame: state.selectedGame,
  teams: state.teams
})

export default connect(mapStateToProps)(MapActivity)
