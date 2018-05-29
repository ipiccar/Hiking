import React, { Component } from 'react';
import { Dimensions, View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { getGameInfos } from "../actions/games";
import { Actions } from "react-native-router-flux";
import { Button } from "../components";
import Camera from 'react-native-camera';

class Challenge extends Component {

    constructor(props) {
        super(props);
    }
    state = {on:false};

    render() {
        return (
            <View style={{ flex: 1 }}>
                    {this.props.selectedChallenge ? (
                        <View style={{flex: 2, alignItems: "center"}}>
                            <ImageBackground source={require('../images/background.jpeg')} style={styles.image}>
                                <Text style={styles.logo}>{this.props.selectedChallenge}</Text>
                            </ImageBackground>
                            <Text style={styles.text}>{this.props.selectedChallenge.description}</Text>
                            <Button onPress={()=> this.setState({on:true})} text="Join a team"/>
                        </View>)
                     : <ImageBackground source={require('../images/loading-dots.gif')} style={{width:150, height:150}}/>
                    }
                <View style={styles.card}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText} onPress={this.takePicture.bind(this)}>
                                Capture
                            </Text>
                        </TouchableOpacity>
                    </Camera>
                </View>
            </View>
        );
    }

    takePicture() {
        this.camera.capture()
            .then((picture) => {
                const data = new FormData();
                //data.append('name', 'testName'); // you can append anyone.
                data.append('file', {
                    uri: picture.path,
                    type: 'image/jpeg', // or photo.type
                    name: 'testPhotoName'
                });
                data.append('name', "coucou");
                const config = {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'multipart/form-data;',
                    },
                    body: data,
                   }
                console.log(data);
                const url = "http://10.113.51.23:3000/upload";
                //const url = "http://10.113.51.23:80/upload.php";
                fetch(url, config).then(res => {
                    console.log(res)
                });
            })
    }
}



    const styles = {
        preview: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width
        },
        capture: {
            flex: 0,
            backgroundColor: '#fff',
            borderRadius: 5,
            color: '#000',
            padding: 10,
            margin: 40
        },
        image: {
            height: 150,
            alignItems: "center",
            justifyContent: "center",

        },
        logo: {
            fontSize: 50,
            color: "#fff",
            textAlign: "center"
        },
        card: {
            flex: 3,
            backgroundColor: '#DED3BF',
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
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
        title: {
            textAlign: "center",
            fontSize: 30,
            color: "#3A3C4A",
            margin: 10
        },
        input: {
            height: 40,
            textAlignVertical: 'top',
            textAlign: 'center',
            marginBottom: 20,
            padding: 10,
            color: '#000',
            margin: 10
        },
        buttonContainer: {
            width: "60%",
            height: "15%",
            backgroundColor: '#5B343C',
            borderRadius: 30,
            marginBottom: 20
        },
        buttonText: {
            color: '#fff',
            textAlign: 'center',
            paddingTop: 10,
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
        profile: state.profile,
        selectedGame: state.selectedGame,
        teams: state.teams
    })

    export default connect(mapStateToProps)(Challenge)
