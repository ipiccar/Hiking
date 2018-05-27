import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'react-native-router-flux';

class MarkerSideMenu extends Component {

  constructor(){
    super();
    this.state = {
      
    }
  }

    render(){
      let {closeDrawer} = this.props
      return (
        <View style={{height:"100%"}}>
          <Text>Test</Text>
          <Text>Test2</Text>
        </View>
      )
    }
}

const mapStateToProps = (state, ownProps) => ({
  routes: state.routes,
  profile: state.profile,
  selectedGame: state.selectedGame,
  teams: state.teams
})

export default connect(mapStateToProps)(MarkerSideMenu)
