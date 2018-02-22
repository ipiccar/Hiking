import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends React.Component {
  render() {
    return (
      <Header headerText='Login'/>
        <LoginForm/>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
