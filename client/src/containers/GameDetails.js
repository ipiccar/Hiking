import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import {getGameInfos} from "../actions/games";
import { Actions } from "react-native-router-flux";

class GameDetails extends Component {

    constructor(props) {
        super(props);
        this.fetchGame=this.fetchGame.bind(this);
        this.fetchGame();
    }


    fetchGame(){
        this.props.dispatch(getGameInfos(this.props.gameId));
    }

    state={};

    pressTeam() {
        Actions.teamList({gameId:this.props.gameId, userId:this.props.userId});
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ImageBackground source={require('../images/background.jpeg')} style={styles.image}>
                    <ImageBackground source={require('../images/BH_logo_white.png')} style={{width:250, height:200}}/>
                </ImageBackground>
                <View style={styles.card}>
                    {this.props.games.response ?
                        <View style={{flex: 2, alignItems: "center"}}>
                            <Text style={styles.title}>{this.props.games.response.name}</Text>
                            <Text style={styles.text}>{this.props.games.response.description}</Text>
                        </View> : <ImageBackground source={require('../images/loading-dots.gif')} style={{width:150, height:150}}/>
                    }

                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={()=> this.pressTeam()}>
                        <Text style={styles.buttonText}>Join a team</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
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
        flex: 3,
        backgroundColor: '#DED3BF',
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
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
        width:"60%",
        height:"15%",
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
        textAlign: 'center',
    }
};


const mapStateToProps = (state, ownProps) => ({
  routes: state.routes,
  games: state.games
})

export default connect(mapStateToProps)(GameDetails)
