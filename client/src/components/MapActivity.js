import React from 'react'
//import { FileSystem, Constants } from 'expo'
import { View } from "react-native";
import { IgnMap, Button } from "./common/Index"

class MapActivity extends React.Component {
  state = {
    //urlTemplate: 'http://www.ngi.be/cartoweb/1.0.0/topo/default/3812/{z}/{y}/{x}.png',
    urlTemplate: 'http://www.ngi.be/cartoweb/1.0.0/topo/default/3857/{z}/{y}/{x}.png',
    //offlineUrlTemplate: `${FileSystem.documentDirectory}tiles/{z}/{x}/{y}.png`,
    mapRegion: undefined,
    isOffline: false,
  }

  handleMapRegionChange = mapRegion => {
    this.setState({
      mapRegion
    })
  }

  render() {
    const { isOffline } = this.state
    /*const urlTemplate = isOffline
    ? this.state.offlineUrlTemplate
    : this.state.urlTemplate*/
      const urlTemplate = this.state.urlTemplate
    return (
      <View style={styles.container}>
        <View style={styles.actionContainer}>

        </View>

        <IgnMap
          onRegionChange = {this.handleMapRegionChange}
          urlTemplate = {urlTemplate}>
        </IgnMap>
      </View>
    )
  }
}

const styles = {
  actionContainer: {
    flexDirection: 'row',
    padding: 15,
    //paddingTop: Constants.statusBarHeight + 15,
    zIndex: 999,
    justifyContent: 'space-around',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  container: {
    flex: 1
  }
}

export { MapActivity };
