import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class Button extends Component {

  static propTypes = {
    containerStyle: View.propTypes.style,
    textStyle: Text.propTypes.style,
    onPress: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  };

  render() {
    let { disabled } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle, disabled ? styles.disabledContainer : null]}
        onPress={disabled ? null : this.props.onPress}
        activeOpacity={disabled ? 1 : 0.5}
      >
        <Text
          style={[styles.text, this.props.textStyle, disabled ? styles.disabledText : null]}
        >
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999999',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#ffffff'
  },
  disabledContainer: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#ffffff'
  },
  text: {
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    color: '#999999',
  },
  disabledText: {
    color: '#dcdcdc',
  },
});
