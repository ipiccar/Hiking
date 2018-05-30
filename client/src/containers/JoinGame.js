import React, { Component } from 'react';
import { View, Image, ImageBackground, Text, TextInput, TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Actions } from "react-native-router-flux";
import { Button } from '../components';
import { initGame } from '../actions/selectedGame';


class JoinGame extends Component {

    constructor(props){
        super(props);
        this.fetchGame=this.fetchGame.bind(this);
        this.onSuccess=this.onSuccess.bind(this);
    }

    state={
      qrCode: "",
      scanOn: false
    };

    pressScan() {
        this.fetchGame("5b0c9d1ba608981e518ba568", this.props.profile.userId);
        //this.state.scanOn ? this.setState({scanOn:false}) : this.setState({scanOn:true});
    }

    onSuccess(e) {
        this.setState({scanOn:false});
        this.fetchGame(e.data, this.props.profile.userId);
    }

    fetchGame(gameId, userId){
        this.props.dispatch(initGame(gameId));
    }

    render() {
      console.log(this.props);
      const scanOn = this.state.scanOn;
      const hasGame = this.props.selectedGame.hasGame == undefined ? false : this.props.selectedGame.hasGame;

        return (
            <View style={{flex:1}}>
                <ImageBackground source={require('../images/background.jpeg')} style={styles.image}>
                    <ImageBackground source={require('../images/BH_logo_white.png')} style={{width:250, height:200}}/>
                </ImageBackground>
                <View style={styles.card}>
                    <View style={{flex:2, alignItems:"center"}}>
                        <Text style={styles.title}>Join a game</Text>
                        <Text style={styles.text}>To join a game, please scan the QR Code provided.</Text>
                        {scanOn && !hasGame ?  (
                            <View style={{padding:25}}>
                              <QRCodeScanner
                              onRead={this.onSuccess.bind(this)}
                              topContent={""}
                              bottomContent={""}
                              />
                            </View>
                          ) : (
                            <Image source={require('../images/qr.png')} style={{width:150, height:150, marginTop:15}}/>
                          )}
                    </View>
                    <View style={{ flex:1, flexDirection:"row", width:"100%"}}>
                      <Button onPress={()=> this.pressScan()} text={scanOn && !hasGame ? "Cancel" : "Scan"}></Button>
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
        color: '#5B343C',
        textAlign: 'center',
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
const mapStateToProps = (state, props) => ({
  routes: state.routes,
  profile: state.profile,
  selectedGame: state.selectedGame
})

export default connect(mapStateToProps)(JoinGame)
