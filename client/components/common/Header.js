import React from 'react';
import { Text, View } from 'react-native';

const Header  = ({headerText}) =>
{const {textStyle, viewStyle} = styles;


    return (
        <View style={viewStyle}>
            <Text style={textStyle}>
                {headerText}
            </Text>
        </View>
            );

}

const styles = {
    textStyle :{
        alignSelf:'center',
        fontSize:20,
        fontWeight:'600',
        paddingTop:10,
        paddingBottom:10
    },
    viewStyle:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f8f8f8',
        height:60,
        paddingTop:15,
        shadowColor:'#000',
        shadowOffset:{width:0, height:2},
        shadowOpacity:0.2,
        elevation:2,
        position:'relative'

    }
};

export { Header} ;