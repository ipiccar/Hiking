import React from 'react'
//import { MapView, FileSystem, Constants } from 'expo'
import MapView from 'react-native-maps';

  const IgnMap = ({onRegionChange, urlTemplate}) => {
      return (
        <MapView
          style={{ flex: 1 }}
          minZoomLevel = {7}
          maxZoomLevel = {15}
          showsUserLocation = {true}
          showsCompass = {true}
          showsScale = {true}
          loadingEnabled= {true}
          //mapType = {"none"}
          //minDelta = {10}
          //maxDelta = {10}
          initialRegion={{
            latitude: 50.2282896,
            longitude: 5.344160600000009,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
          onRegionChange={onRegionChange}>
          <MapView.UrlTile urlTemplate={urlTemplate} zIndex={1}/>
        </MapView>
    )
  }

export { IgnMap };
