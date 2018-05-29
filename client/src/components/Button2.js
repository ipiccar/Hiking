import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button2  = ({onPress, text, disabled}) => {
  const {buttonStyle, textStyle, isDisabled} = styles;

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
        color:'#5B343C',
        fontSize: 22,
        fontWeight: '700'
    },
    buttonStyle:{
        height: 60,
        flexGrow: 1,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "#5B343C",
        marginLeft: 5,
        marginRight: 5,
        justifyContent: "center",
        alignItems: "center"
    }
};

export {Button2};
