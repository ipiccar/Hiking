import React, { Component } from 'react';
import { View, Image, ImageBackground, Text, TextInput, TouchableOpacity} from "react-native";
import { Header, Card, CardSection, Input, Button } from "./common/Index";


class LoginForm extends Component {

    state={scan:false, name:''};

    pressJoin(){
        ;

    }

    render() {
        return (
            <ImageBackground source={require('../images/background.jpeg')} style={styles.image}>
            <View style={styles.filter}>
                <Header headerText={"Hiking App !"}/>
                {this.state.scan ?
                    <Text style={styles.text}>Hello {this.state.name} !</Text>
                    :
                    <Text style={styles.text}>Choose your hiker name :</Text>
                }
                <View style = {styles.container}>
                    {this.state.scan ?
                        <View>
                        <Text style={{marginLeft:15, marginRight:15}}>To join a game, please scan the QR Code provided</Text>
                        <Image style={{marginTop:10, marginBottom :10, width: 50, height: 50, alignSelf:'center'}} source={require('../images/qr.png')}/>
                        </View>

                        : <TextInput style={styles.input}
                                    value={this.state.name}
                            onChangeText={(name) => this.setState({name:name})}
                                     autoCapitalize="none"
                                     autoCorrect={false}
                                     returnKeyType="next"
                                     placeholder='Username'
                                     placeholderTextColor='rgba(0,0,0,0.7)'/>
                    }
                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={()=> this.setState({scan:true})}>
                        <Text  style={styles.buttonText}>{this.state.scan ? "SCAN" : "JOIN"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        );
    }
}



const styles = {
    image: {
        flex: 1,

    },
    filter: {
        flex: 1,
        backgroundColor: 'rgba(0,255,255,0.3)'
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
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1

    },
    input: {
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        textAlignVertical: 'top',
        textAlign: 'center',
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 20,
        padding: 10,
        color: '#000'
    },
    buttonContainer: {
        width: '30%',
        height: '30%',
        backgroundColor: '#f99494',
        paddingVertical: 11,
        borderRadius: 10,
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
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

export default LoginForm;
