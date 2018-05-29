import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {joinTeam, leaveTeam} from "../actions/selectedTeam";
import { Button } from "../components";

class PlayerList extends Component{
    constructor(props) {
        super(props);
        this.joinTeam=this.joinTeam.bind(this);
    }

    state={};

    joinTeam(){
        this.props.selectedTeam.joined ?
        (
          this.props.dispatch(leaveTeam(this.props.selectedTeam.teamId, this.props.profile))
        ) : (
          this.props.dispatch(joinTeam(this.props.selectedTeam.teamId, this.props.profile))
        )
    }

    render(){
      if (this.props.teams.byId === undefined){
        return (
          <View style={styles.container}>
            <ImageBackground source={require('../images/loading-dots.gif')} style={{width:150, height:150}}/>
          </View>
        );
      }
      return(
          <View style={styles.container}>
            <Text style={styles.title}>{this.props.selectedTeam.name}</Text>
            <ScrollView contentContainerStyle={{flexGrow:1}} style={{paddingLeft:40, paddingRight:40}}>
                {this.props.selectedTeam.users.map(player => (
                    <View key={player._id} style={{alignItems:"center",flexDirection:"row", justifyContent:"space-between", padding:30, borderBottomWidth:1,borderBottomColor:"#8F6C5C"}}>
                        <Image source={require('../images/icon_profile_single_brown.png')} style={{width:56, height:60, marginRight:20}}/>
                        <View style={{flexDirection:"column",paddingLeft:20, flex:1}}>
                            <Text style={styles.text}> {player.name} </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={{width:"100%", backgroundColor:"#DED3BF", padding:40}}>
              <Button onPress={()=> this.joinTeam()} text={this.props.selectedTeam.joined ? "Leave team" : "Join team"}/>
            </View>
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
    dataReducer: state.dataReducer,
    routes: state.routes,
    games: state.games,
    teams: state.teams,
    profile: state.profile,
    selectedGame: state.selectedGame,
    selectedTeam: state.selectedTeam
})

export default connect(mapStateToProps)(PlayerList)
