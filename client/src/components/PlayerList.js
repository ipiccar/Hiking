import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

class PlayerList extends Component{
    constructor(props) {
        super(props);
        this.state = {teamName: "",
            players: [{id: 1, hikerName: "Fake data 1"}, {id: 2, hikerName: "Fake data 1"}, {
                id: 3,
                hikerName: "Fake data 1"
            }]
        };
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:8}}>
                    <Text style={styles.title}>{this.state.teamName}</Text>
                    {this.state.players.map(player => (
                        <View key={player.id} style={{alignItems:"flex-start",flexDirection:"row"}}>
                            <Image source={require('../images/avatar.png')} style={{width:60, height:60}}/>
                            <Text style={styles.text}> {player.hikerName} </Text>
                        </View>
                    ))}
                </View>
                <View style={{flex:1, flexDirection:"row"}}>
                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={()=> this.pressScan()}>
                        <Text style={styles.buttonText}>Join team</Text>
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

export { PlayerList }