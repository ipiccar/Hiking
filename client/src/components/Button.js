import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button  = ({onPress, text, disabled}) => {
  const {buttonStyle, textStyle} = styles;

  if (disabled) {
    return null
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
          <Text style={textStyle}>
              {text}
          </Text>
      </TouchableOpacity>

          );
  }
}

const styles = {
    textStyle :{
        color:'#FFFFFF',
        fontSize: 22,
        fontWeight: '700'
    },
    buttonStyle:{
        height: 60,
        flexGrow: 1,
        backgroundColor: '#5B343C',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "#5B343C",
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: "center",
        alignItems: "center"
    }
};

export {Button};
