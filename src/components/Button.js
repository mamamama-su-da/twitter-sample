import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class Button extends Component {

  render() {
    var colorStyle = {
      // color: this.state.active ? '#fff' : '#000',
    };
    return (
      <Text
        style={[styles.button, this.props.style, colorStyle]}
        onPress={this.props.onPress}
      >
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    overflow: 'hidden',
    color: '#000000',
  },
});