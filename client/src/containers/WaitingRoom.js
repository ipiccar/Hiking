import React, { Component } from 'react';
import { View, Image, ImageBackground, Text, TextInput} from "react-native";
import { Header, Card, CardSection, Input, Button } from "../components";
import { connect } from 'react-redux';
import {launchRefresh} from '../actions/refresh'
import {initNotifications} from '../actions/notifications'
import { Actions } from "react-native-router-flux";


class WaitingRoom extends Component {

  constructor(props){
      super(props);
      this.state={isAdmin:false, hikerName:""};
      this.refresher=this.refresher.bind(this);
      this.getNotifications=this.getNotifications.bind(this);
      this.getNotifications()
  }


    startGame() {
        Actions.map();
    }

    refresher(){
      console.log(this.props.selectedGame.gameId);
      console.log(this.props.selectedGame.gameId);
      this.props.dispatch(launchRefresh(this.props.selectedGame.gameId, this.props.selectedTeam.teamId))
    }

    getNotifications(){
      this.props.dispatch(initNotifications(this.props.selectedGame.gameId))
    }

    render() {
      if (this.props.notifications.byId === undefined){
        return (
            <View style={{flex:1}}>
                <ImageBackground source={require('../images/background.jpeg')} style={styles.image}>
                <ImageBackground source={require('../images/BH_logo_white.png')} style={{width:250, height:200}}/>
                <ImageBackground source={require('../images/people_and_trophy.png')} style={{width:300, height:100}}/>
                </ImageBackground>
                <View style={styles.card}>
                    <Text style={styles.title}>Waiting for the game master</Text>
                    <ImageBackground source={require('../images/loading-dots.gif')} style={{width:150, height:150}}/>
                </View>
            </View>
        );
      } else {
        return (
            <View style={{flex:1}}>
                <ImageBackground source={require('../images/background.jpeg')} style={styles.image}>
                <ImageBackground source={require('../images/BH_logo_white.png')} style={{width:250, height:200}}/>
                <ImageBackground source={require('../images/people_and_trophy.png')} style={{width:300, height:100}}/>
                </ImageBackground>
                <View style={styles.card}>
                    <Text style={styles.title}>Game is ready</Text>
                    <View style={{ flex:1, flexDirection:"row", width:"100%", backgroundColor:"#DED3BF"}}>
                      <Button onPress={()=> this.startGame()} text="Start game"/>
                    </View>
                </View>
            </View>
        );
      }

    }
}



const styles = {
    image: {
        flex: 3,
        alignItems:"center",
        justifyContent:"center",

    },
    logo:{
        fontSize:50,
        color:"#fff",
        textAlign:"center"
    },
    card: {
        flex: 2,
        backgroundColor: '#DED3BF',
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-around",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1

    },
    container: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 300,
        paddingTop: 25,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',


    },
    title:{
        fontSize:30,
        color:"#3A3C4A",
        textAlign:"center",
        margin:5
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
        width:"60%",
        height:"20%",
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
        marginTop: 130,
        color: '#fff',
        textAlign: 'center',
    }
};

const mapStateToProps = (state, props) => ({
  dataReducer: state.dataReducer,
  routes: state.routes,
  games: state.games,
  teams: state.teams,
  profile: state.profile,
  selectedGame: state.selectedGame,
  selectedTeam: state.selectedTeam,
  notifications: state.notifications
})

export default connect(mapStateToProps)(WaitingRoom)
