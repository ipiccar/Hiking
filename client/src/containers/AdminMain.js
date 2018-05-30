import React, { Component } from 'react';
import { View, Image, ImageBackground, Text, TextInput, TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import {fetch_admin_login} from "../actions/action_users";

class AdminMain extends Component {

    state={};

    render() {
        return (
            <View style={{flex:1}}>
                <ImageBackground source={require('../images/background.jpeg')} style={styles.image}>
                    <ImageBackground source={require('../images/BH_logo_white.png')} style={{width:250, height:200}}/>
                </ImageBackground>
                <View style={styles.card}>
                    <View style={styles.minicard}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", padding:10}}>
                            <Image source={require('../images/icon_trophy_brown.png')} style={{width:40, height:40, marginRight:5}}/>
                            <View style={{flexDirection:"column", justifyContent:"space-between"}}>
                            <Text style={styles.title}>Start a game</Text>
                            <Text style={styles.text}>You will be able to share the game QR-code and monitor the game.</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.minicard}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", padding:10}}>
                            <Image source={require('../images/icon_map_game_brown.png')} style={{width:40, height:40, marginRight:5}}/>
                            <View style={{flexDirection:"column",justifyContent:"space-between"}}>
                                <Text style={styles.title}>Edit a game</Text>
                                <Text style={styles.text}>This includes editing map pins, challenges and creating new games.</Text>
                            </View>
                        </View>
                    </View>
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
        padding:20,
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
    minicard:{
        borderColor:"#8F6C5C",
        margin:10,
        padding:10,
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
        fontSize:22,
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
        width:"40%",
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
        color: '#5B343C'
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonTouchable: {
        padding: 16,
    }
};

export function postForm(path, form) {
    const base = options.baseUrl || "";
    const str = [];
    for (let p in form) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(form[p]));
    }
    const body = str.join("&");
    const req = {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    };
    return fetch(base + path, req);
}
const mapStateToProps = (state, ownProps) => ({
    routes: state.routes,
    games: state.games
})

export default connect(mapStateToProps)(AdminMain)
