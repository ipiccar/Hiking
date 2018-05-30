import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, ImageBackground, Modal, TouchableHighlight, TextInput, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { fetch_teams } from "../actions/teams";
import { displayTeam, create_team } from "../actions/selectedTeam";
import { Actions } from "react-native-router-flux";
import { Button, Button2 } from "../components";
import Prompt from 'rn-prompt';

class TeamList extends Component{
    constructor(props) {
        super(props);
        this.fetchTeams=this.fetchTeams.bind(this);
        this.createTeam=this.createTeam.bind(this);
        this.fetchTeams();
        this.state = {
          hasJoined:false,
          hasCreatedTeam:false,
          modalVisible:false
        };
    }


    fetchTeams(){
        this.props.dispatch(fetch_teams(this.props.selectedGame.gameId));
    }

    createTeam(input){
        this.setState({modalVisible:false});
        this.props.dispatch(create_team(input, this.props.selectedGame.gameId, this.props.profile.userId));
    }

    pressStart(){
      if (this.props.selectedTeam.joined){
        Actions.waitingroom();
      }
    };

    pressTeam(team){
      console.log(team);
        this.props.dispatch(displayTeam(team))
        Actions.players();

    }

    render(){
      if (this.props.teams.byId === undefined){
        return (
          <View style={styles.loading}>
            <ImageBackground source={require('../images/loading-dots.gif')} style={{width:150, height:150}}/>
          </View>
        );
      }
      if (this.props.selectedTeam.teamId === undefined){
        myTeamId = 0
      } else {
        if (this.props.selectedTeam.joined){
          myTeamId = this.props.selectedTeam.teamId
        } else {
          myTeamId = 0
        }
      }
        return(
          <View style={styles.container}>
                  <Text style={styles.title}>Join a team</Text>
                  <ScrollView contentContainerStyle={{flexGrow:1}} style={{paddingLeft:40, paddingRight:40}}>
                          {this.props.teams.byId.map(team => (
                            <TouchableOpacity onPress={()=> this.pressTeam(team)}>
                                <View key={team.teamId} style={{alignItems:"center",flexDirection:"row", justifyContent:"space-between", padding:30, borderBottomWidth:1,borderBottomColor:"#8F6C5C"}}>
                                    <Image source={require('../images/icon_profile_team_brown.png')} style={{width:60, height:44, marginRight:20}}/>
                                    <View style={{flexDirection:"column",paddingLeft:20, flex:1}}>
                                        <Text style={myTeamId == team.teamId ? styles.joined : styles.text}> {team.name} </Text>
                                        <Text style={styles.text}> {team.nbUsers} members in the team.</Text>
                                    </View>
                                    <Image source={require('../images/icon_arrow_right_brown.png')} style={{width:11, height:20, marginLeft:20}}/>
                                </View>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
              <View style={{width:"100%", backgroundColor:"#DED3BF", flex:0, flexDirection:"row", padding:40 }}>
                  <Button onPress={() => this.setState({ modalVisible: true })} text="Create team" disabled={this.state.hasCreatedTeam}/>
                  <Button2 onPress={()=> this.pressStart()} text="Start"/>

              </View>
              <Prompt
            title="Create team"
            placeholder="Enter a team name"
            visible={this.state.modalVisible}
            onCancel={() => this.setState({ modalVisible: false})}
            onSubmit={(value) => this.createTeam(value)}/>
          </View>
        )
      }
}



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
      alignItems:"stretch",
      justifyContent:"center"
  },
  loading: {
      flex: 1,
      backgroundColor: '#DED3BF',
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center"
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
    text: {
        color: '#5B343C',
    },
    joined: {
        color: '#5B343C',
        fontWeight: '700'
    },
};

const mapStateToProps = (state, props) => ({
  routes: state.routes,
  profile: state.profile,
  selectedGame: state.selectedGame,
  teams: state.teams,
  dataReducer: state.dataReducer,
  selectedTeam: state.selectedTeam
})

export default connect(mapStateToProps)(TeamList)
