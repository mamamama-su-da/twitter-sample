import React, {Component} from 'react';
import {
  AppRegistry,
} from 'react-native';
import HelloWorld from 'Twitter/src/samples/HelloWorld';
import Tweet1 from 'Twitter/src/samples/Tweet1';
import Tweet2 from 'Twitter/src/samples/Tweet2';
import Tweet3 from 'Twitter/src/samples/Tweet3';
import Tweet4 from 'Twitter/src/samples/Tweet4';
import AppRoot from 'Twitter/src/containers/AppRoot';

class Twitter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HelloWorld />
    );
  }
}

AppRegistry.registerComponent('Twitter', () => Twitter);
