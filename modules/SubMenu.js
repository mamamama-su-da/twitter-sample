import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';
import twitter from '../commons/TwitterManager';
import Button from '../components/Button';

export default class SubMenu extends Component {

  static propTypes = {
    onLogoutComplete: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  _logout() {
    AsyncStorage.removeItem('access_token').then(() => {
      twitter.options.access_token_key = null;
      twitter.options.access_token_secret = null;
      this.props.onLogoutComplete();
    });
  }

  render() {
    return (
      <View style={styles.base}>
        <Button onPress={this._logout.bind(this)}>
          ログアウト
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});
