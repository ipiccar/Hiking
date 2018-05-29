import React from 'react';
import { View, Image } from 'react-native';
import marker_dark1 from '../images/marker_dark1.png';
import marker_dark2 from '../images/marker_dark2.png';

const CustomMarker  = ({type, children}) =>
{const {buttonStyle, textStyle} = styles;



  switch (type) {
    case 'type1':
    return (
      <View>
        <Image
          style={{width: 70, height: 70}}
          source={require('../images/marker_dark1.png')}/>
      </View>
   )
     break;
     case 'type2':
     return (
       <View>
         <Image source={require('../images/marker_dark2.png')}/>
       </View>
    )
      break;
    default:
  }
}

const styles = {
    textStyle :{
        alignSelf:'center',
        color:'#007F00',
        fontSize:16,
        fontWeight:'600',
        paddingTop:10,
        paddingBottom:10
    },
    buttonStyle:{
        flex:1,
        alignSelf:'stretch',
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#007F00',
        marginLeft:5,
        marginRight:5
    }
};

export {CustomMarker};
