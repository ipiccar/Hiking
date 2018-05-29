import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, ImageBackground, Modal, TouchableHighlight, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { displayTeam } from "../actions/selectedTeam"
import { Button, Button2 } from "../components";

class NotificationList extends Component{
    constructor(props) {
        super(props);
        //this.fetchNotifications();
    }

    state = {
    };


    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:8}}>
                    <Text style={styles.title}>Read the notifications</Text>
                    {this.props.notifications.byId !== undefined ? (
                        <View style={{marginLeft:40, marginRight:40}}>
                            {this.props.notifications.byId.map(notif => (
                              <TouchableOpacity onPress={()=> this.pressNotif(notif)}>
                                  <View key={notif.notificationId} style={{alignItems:"center",flexDirection:"row", justifyContent:"space-between", padding:30, borderBottomWidth:1,borderBottomColor:"#8F6C5C"}}>
                                      <Image source={require('../images/icon_profile_team_brown.png')} style={{width:60, height:44, marginRight:20}}/>
                                      <View style={{flexDirection:"column",paddingLeft:20}}>
                                          <Text style={styles.text}> {notif.description} </Text>
                                      </View>
                                  </View>
                              </TouchableOpacity>
                            )
                          )}
                        </View>
                    ) : (
                        <ImageBackground source={require('../images/loading-dots.gif')} style={{width:150, height:150}}/>
                    )}
                </View>
          </View>
        )
}}



const styles = {
    image: {
        flex: 2,
        alignItems:"center",
        justifyContent:"center",

    },
    logo:{
        fontSize:50,
        color:"#fff",
        textAlign:"center"
    },
    card: {
        flex: 1,
        backgroundColor: '#DED3BF',
        flexDirection:"row",
        justifyContent:"center",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1

    },
    container: {
        flex: 1,
        backgroundColor: '#DED3BF',
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"flex-start",


    },
    title:{
        textAlign:"center",
        fontSize:30,
        color:"#3A3C4A",
        margin:10
    },
    input: {
        height: 40,
        textAlignVertical: 'top',
        textAlign: 'center',
        marginBottom: 20,
        padding: 10,
        color: '#000',
        margin:10
    },
    buttonContainer: {
        width:"50%",
        height:"70%",
        backgroundColor: '#5B343C',
        borderRadius: 30,
        marginBottom:20
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        paddingTop:10,
        fontSize: 22,
        fontWeight: '700'
    },
    text: {
        color: '#5B343C',
    },
    modal: {
        width:"50%",
        height:"50%",
        backgroundColor: '#5B343C',
        borderRadius: 30,
    }
};

const mapStateToProps = (state, props) => ({
  routes: state.routes,
  profile: state.profile,
  selectedGame: state.selectedGame,
  teams: state.teams,
  selectedTeam: state.selectedTeam,
  dataReducer: state.dataReducer,
})

export default connect(mapStateToProps)(NotificationList)
