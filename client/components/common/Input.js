import React from 'react';
import { TextInput, Text, View } from 'react-native';

const Input = ({label, value, onChangeText, placeholder}) => {
    const {textStyle, textInputStyle, containerStyle} = styles;

    return (
        <View style={containerStyle}>
            <Text style={textStyle}>
                {label}
            </Text>
            <TextInput
                value={value}
                style={textInputStyle}
                onChangeText={onChangeText}
                autoCorrect={false}
                placeholder={placeholder}
            />
        </View>
    );

}

const styles = {
    textStyle:{
        fontSize:18,
        addingLeft:20,
        flex:1
    },
    containerStyle:{
        height:40,
        flex:1,
        flexDirection:'row',
        alignItems:'center',

    },
    textInputStyle:{
        height:20,
        width:100,
        color:'#000',
        paddingRight:5,
        paddingLeft:20,
        fontSize:18,
        lineHeight:23,
        flex:2,
    }
};

export { Input };