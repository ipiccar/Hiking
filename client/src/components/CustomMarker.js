import React from 'react';
import { View, Image } from 'react-native';
import marker_dark1 from '../images/marker_dark1.png';
import marker_dark2 from '../images/marker_dark2.png';

const markerImages = [
  require('../images/marker_dark1.png'),
  require('../images/marker_dark2.png')
];

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

async function _loadAssetsAsync() { //get all required images in cache before page load
  const imageAssets = cacheImages(markerImages);
  await Promise.all([...imageAssets]);
}

const CustomMarker  = ({type, children}) =>
{const {buttonStyle, textStyle} = styles;

_loadAssetsAsync()

  switch (type) {
    case 'type1':
    return (
      <View>
        <Image
          style={{width: 70, height: 70}}
          source={markerImages[0]}/>
      </View>
   )
     break;
     case 'type2':
     return (
       <View>
         <Image source={markerImages[1]}/>
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
