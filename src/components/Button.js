import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class Button extends Component {

  static propTypes = {
    style: React.PropTypes.object,
    onPress: React.PropTypes.func,
  };

  render() {
    return (
      <Text
        style={[styles.button, this.props.style]}
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
    alignSelf: 'center',
    overflow: 'hidden',
    color: '#000000',
  },
});
