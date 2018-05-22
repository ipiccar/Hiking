import React from 'react';
import { View, Text, Image } from 'react-native';

const TeamCard  = (props) =>
{
    const { teamName, teamSize } = this.props;

    return (
        <View style={styles.containerStyle}>
            <Image source={require('../images/team.png')} style={{width:60, height:60}}/>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.title}> {teamName} </Text>
                <Text style={styles.text}> {teamSize} </Text>
            </View>
        </View>
    );
}

const styles = {
    containerStyle :{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1,
        borderRadius:2,
        borderColor:'#ddd',
        borderBottomWidth:0,
        shadowColor:'#000',
        shadowOffset:{width:0, height:2},
        shadowOpacity:0.1,
        shadowRadius:2,
        elevation:1,
        marginLeft:5,
        marginRight:5,
        marginTop:10
    },
    title:{
        fontSize:30,
        color: '#5B343C',
        textAlign: 'center'
    },
    text:{
        fontSize:20,
        color: '#5B343C',
        textAlign: 'center'
    }
};

export { TeamCard };