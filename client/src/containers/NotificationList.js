import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, Modal, TouchableHighlight, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { displayTeam } from "../actions/selectedTeam"
import { Actions } from "react-native-router-flux";
import { Button, Button2 } from "../components";

class NotificationList extends Component{
    constructor(props) {
        super(props);
        this.fetchNotifications=this.fetchNotifications.bind(this);
        //this.fetchNotifications();
    }

    state = {
    };

    fetchNotifications(){
        this.props.dispatch(fetch_notifications(this.props.selectedGame.gameId, this.props.selectedTeam.teamId));
    }

    render(){
        if (this.props.notifications.byId === undefined){
            return (
              <View style={styles.container}>
                <ImageBackground source={require('../images/loading-dots.gif')} style={{width:150, height:150}}/>
              </View>
            );
          }
          return(
            <View style={styles.container}>
              <Text style={styles.title}>Notifications</Text>
              <ScrollView contentContainerStyle={{flexGrow:1}} style={{paddingLeft:40, paddingRight:40}}>
                  {this.props.notifications.notifications.map(notif => (
                      <View key={notif._id} style={{alignItems:"center",flexDirection:"row", justifyContent:"space-between", padding:30, borderBottomWidth:1,borderBottomColor:"#8F6C5C"}}>
                          <View style={{flexDirection:"column",paddingLeft:20}}>
                              <Text style={styles.text}> {notif.description} </Text>
                          </View>
                      </View>
                  ))}
              </ScrollView>
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
