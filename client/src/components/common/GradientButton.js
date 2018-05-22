import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";


const GradientButton  = ({onPress, children}) =>
{const {buttonContainer, buttonText} = styles;


    return (


        <LinearGradient
            colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
            style={{ height: 48, width: 200, alignItems: 'center', justifyContent: 'center', width: 200}}
        >
            <TouchableOpacity onPress={onPress} style={buttonContainer}>
                <Text style={buttonText}>
                    {children}
                </Text>
            </TouchableOpacity>
        </LinearGradient>

    );

}

const styles = {
    buttonContainer: {
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#4C64FF',
        padding: 15,
        width: 200
    }

};

export {GradientButton};