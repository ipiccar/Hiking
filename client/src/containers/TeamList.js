import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, ImageBackground, Modal, TouchableHighlight, TextInput} from 'react-native';
import { connect } from 'react-redux';
import {create_team, fetch_teams} from "../actions/teams";
import { Actions } from "react-native-router-flux";

class TeamList extends Component{
    constructor(props) {
        super(props);
        this.fetchTeams=this.fetchTeams.bind(this);
        this.createTeam=this.createTeam.bind(this);
        this.fetchTeams();
    }

    state = {hasJoined:false, hasCreatedTeam:false, teamName:"", modalVisible:false};

    fetchTeams(){
        this.props.dispatch(fetch_teams(this.props.gameId));
    }

    createTeam(){
        this.props.dispatch(create_team(this.state.teamName, this.props.gameId, this.props.userId));
        this.setState({modalVisible:false});
    }

    pressCreateTeam(){
        if(!this.state.hasCreatedTeam){
            this.setState({modalVisible:true});
        }
    };

    pressStart(){};

    pressTeam(team){
        Actions.players({team:team, userId:this.props.userId});

    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:8}}>
                <Text style={styles.title}>Join a team</Text>
                    {this.props.teamList!=undefined  ?
                    <View style={{marginLeft:40, marginRight:40}}>
                  {this.props.teamList.map(team => (
                      <TouchableOpacity
                          onPress={()=> this.pressTeam(team)}
                      >
                      <View key={team.id} style={{alignItems:"center",flexDirection:"row", justifyContent:"space-between", padding:30, borderBottomWidth:1,borderBottomColor:"#8F6C5C"}}>
                          <Image source={require('../images/icon_profile_team_brown.png')} style={{width:60, height:44, marginRight:20}}/>
                          <View style={{flexDirection:"column",paddingLeft:20}}>
                              <Text style={styles.text}> {team.name} </Text>
                              <Text style={styles.text}> {team.users.length} members in the team </Text>
                          </View>
                          <Image source={require('../images/icon_arrow_right_brown.png')} style={{width:11, height:20, marginLeft:20}}/>
                      </View>
                      </TouchableOpacity>
                    ))}
                </View> : <ImageBackground source={require('../images/loading-dots.gif')} style={{width:150, height:150}}/>}
                </View>
                <View style={{flex:1, flexDirection:"row"}}>
                  <TouchableOpacity style={styles.buttonContainer}
                                    disabled={this.state.hasCreatedTeam}
                                    onPress={()=> {} }>
                      <Text style={styles.buttonText}>Create team</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer}
                                    disabled={!this.state.hasJoined}
                                    onPress={()=> this.pressStart()}>
                      <Text style={styles.buttonText}>Start</Text>
                  </TouchableOpacity>
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

const mapStateToProps = (state, ownProps) => ({
  routes: state.routes,
  games: state.games,
    teams: state.teams,
    teamList: state.teams.response
})

export default connect(mapStateToProps)(TeamList)
