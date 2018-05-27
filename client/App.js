import React, { Component } from 'react';
import Router from "./Router"
import configureStore from './src/store/configureStore'

const store = configureStore()

export default class App extends Component<> {
    render() {
        return (
            <Router store={store}/>
        );
  }
}
