import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

class TeamList extends Component{
    constructor(props) {
        super(props);
        this.state = {teams:[{id:1, teamName:"Fake data 1", teamSize:4}, {id:2, teamName:"Fake data 2", teamSize:6}, {id:3, teamName:"Fake data 3", teamSize:2}, {id:4, teamName:"Fake data 4", teamSize:8}]};
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:8}}>
                <Text style={styles.title}>Join a team</Text>
                <View style={{marginLeft:40, marginRight:40}}>
                  {this.state.teams.map(team => (
                      <View key={team.id} style={{alignItems:"center",flexDirection:"row", justifyContent:"space-between", padding:30, borderBottomWidth:1,borderBottomColor:"#8F6C5C"}}>
                          <Image source={require('../images/icon_profile_team_brown.png')} style={{width:60, height:44, marginRight:20}}/>
                          <View style={{flexDirection:"column",paddingLeft:20}}>
                              <Text style={styles.text}> {team.teamName} </Text>
                              <Text style={styles.text}> {team.teamSize} members in the team </Text>
                          </View>
                          <Image source={require('../images/icon_arrow_right_brown.png')} style={{width:11, height:20, marginLeft:20}}/>
                      </View>
                    ))}
                </View>
                </View>
                <View style={{flex:1, flexDirection:"row"}}>
                  <TouchableOpacity style={styles.buttonContainer}
                                    onPress={()=> this.pressScan()}>
                      <Text style={styles.buttonText}>Create team</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer}
                                    onPress={()=> this.pressScan()}>
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

    }
};

const mapStateToProps = (state, ownProps) => ({
  routes: state.routes,
  games: state.games
})

export default connect(mapStateToProps)(TeamList)