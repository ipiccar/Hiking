import React, { Component } from 'react';
import { View, Image, ImageBackground, Text, TextInput, TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
import { Button, Button2 } from "../components";

import {create_user, fetch_login} from '../actions/action_users';

class Main extends Component {

    constructor(props){
        super(props);

        this.checkUser=this.checkUser.bind(this);
    }

    this.state ={
      hikerName:"",
      emptyField:true,
      tryToSend: false,
    };

    fieldChange(input){
      this.setState({tryToSend:false})
      console.log("try to send false");
      if (this.state.hikerName == ''){
        this.setState({emptyField:true})
        console.log("not empty field");
      } else {
        this.setState({emptyField:false})
        console.log("empty field");
      }
      this.setState({hikerName:input})
    }

    checkUser() {
      this.setState({tryToSend:true})
      console.log("try to send");
      if (this.state.hikerName != ''){
          this.props.dispatch(fetch_login(this.state.hikerName));
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
                        <Text style={styles.title}>Choose your hiker name !</Text>
                        {this.props.profile.alreadyExists ? <Text>The hiker {this.props.profile.name} already exists</Text> : null }
                        {this.state.emptyField && this.state.tryToSend ? <Text>Please enter a hiker name</Text> : null }
                        <TextInput style={styles.input}
                        value={this.state.hikerName}
                        onChangeText={(hikerName) => this.fieldChange(hikerName)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"/>
                        <View style={{ flex:1, flexDirection:"row", width:"100%"}}>
                          <Button onPress={this.checkUser} text="Join" />
                        </View>
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
        padding:30,
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
        fontSize:18,
        color:"#3A3C4A",
        textAlign: 'center',
        margin:5,
        flex:1
    },
    input: {
        height: 40,
        width:"100%",
        textAlignVertical: 'top',
        textAlign: 'center',
        marginBottom: 20,
        padding: 10,
        color: '#000',
        margin:10
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

export default connect(mapStateToProps)(Main)
