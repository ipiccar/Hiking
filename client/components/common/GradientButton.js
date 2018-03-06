import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";


const GradientButton  = ({onPress, children}) =>
{const {buttonContainer, buttonText} = styles;


    return (


        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
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