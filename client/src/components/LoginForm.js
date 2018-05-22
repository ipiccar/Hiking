import React, { Component } from 'react';
import { View, Image, ImageBackground, Text, TextInput, TouchableOpacity} from "react-native";
import { Header, Card, CardSection, Input, Button, MyGradient } from "./common/Index";
import { Actions } from "react-native-router-flux";


class LoginForm extends Component {

    state={isAdmin:false, hikerName:""};

    pressJoin() {
        //call Api
        //if username exist
            //check if admin
                //if admin -> go login
                //if not -> display message
        //continue
        Actions.scan({name: this.state.hikerName});

    }

    isAdmin() {
        return fetch('https://localhost:3000/user/name'+this.state.hikerName)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ImageBackground source={require('../images/background.jpeg')} style={styles.image}>
                    <ImageBackground source={require('../images/bold.png')} style={{width:60, height:60}}/>
                    <Text style={styles.logo}>Bearlock Holmes</Text>
                    <ImageBackground source={require('../images/success.png')} style={{width:60, height:60}}/>
                </ImageBackground>
                    <View style={styles.card}>
                        <View style={{flex:2}}>
                            <Text style={styles.title}>Choose your hiker name !</Text>

                            <TextInput style={styles.input}
                            value={this.state.hikerName}
                            onChangeText={(hikerName) => this.setState({hikerName})}
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"/>
                        </View>

                        <TouchableOpacity style={styles.buttonContainer}
                                      onPress={()=> this.pressJoin()}>
                        <Text style={styles.buttonText}>Join</Text>
                    </TouchableOpacity>

                 </View>
            </View>
        );
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

export {LoginForm};
