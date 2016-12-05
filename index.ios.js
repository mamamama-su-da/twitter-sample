import React, {Component} from 'react';
import {
  AppRegistry,
} from 'react-native';
import AppRoot from 'Twitter/src/containers/AppRoot';

class Twitter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppRoot />
    );
  }
}

AppRegistry.registerComponent('Twitter', () => Twitter);
