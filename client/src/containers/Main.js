import React, { Component } from 'react';
import { View, Image, ImageBackground, Text, TextInput, TouchableOpacity} from "react-native";
import { Header, Card, CardSection, Input, Button, MyGradient } from "../components";
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";

import { fetch_login } from  '../actions/action_users';


class LoginForm extends Component {

    constructor(props){
        super(props);
        this.checkUser=this.checkUser.bind(this);
    }

    state={isAdmin:false, hikerName:""};

    checkUser() {
        this.props.dispatch(fetch_login(this.state.hikerName));
        if(this.props.profile.type!=undefined){
            if(this.props.profile.type.toUpperCase()=="GM"){
                Actions.login({name: this.State.hikerName});
            }
            else{

            }
        }
        else{

        }

    }

    render() {

        return (
            <View style={{flex:1}}>
                <ImageBackground source={require('../images/background.jpeg')} style={styles.image}>
                    <ImageBackground source={require('../images/BH_logo_white.png')} style={{width:250, height:200}}/>
                    <ImageBackground source={require('../images/people_and_trophy.png')} style={{width:300, height:100}}/>
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
                        {this.props.dataReducer.loading==true ?
                            <ImageBackground source={require('../images/loading-dots.gif')} style={{width:150, height:150}}/>
                            : (<TouchableOpacity style={styles.buttonContainer}
                                      onPress={()=> this.checkUser()}>
                        <Text style={styles.buttonText}>Join</Text>
                    </TouchableOpacity>)}
:
        (<ImageBackground source={require('../images/loading-dots.gif')} style={{width:150, height:150}}/>)}
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
        height:260,
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

const mapStateToProps = (state, props) => ({
  routes: state.routes,
  games: state.games,
    profile: state.profile,
    dataReducer: state.dataReducer
})

export default connect(mapStateToProps)(LoginForm)
