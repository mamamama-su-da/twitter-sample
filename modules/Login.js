import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  WebView,
  AsyncStorage,
  NavigatorIOS,
  ActivityIndicator,
} from 'react-native';
import Query from '../commons/Query';
import twitter from '../commons/TwitterManager';

export default class Login extends Component {

  static propTypes = {
    onLoginComplete: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      url: 'about:blank',
    }
  }

  componentDidMount() {
    twitter.getRequestToken().then(token => {
      this.oauth_token_secret = token.oauth_token_secret;
      this.refs.nav.replace({
        component: WebView,
        title: 'Login',
        passProps: {
          source: {uri: 'https://api.twitter.com/oauth/authorize?oauth_token=' + token.oauth_token},
          onShouldStartLoadWithRequest: this._onShouldStartLoadWithRequest.bind(this),
          style: styles.base,
        }
      });
    });
  }

  _onShouldStartLoadWithRequest(event) {
    // TODO キャンセルされた場合の対応が必要 '?denied'
    console.log(event);
    if (event.url.indexOf('https://example.com/?oauth_token') > -1) {
      const authResult = Query.parse(event.url);
      twitter.getAccessToken(authResult.oauth_token, this.oauth_token_secret, authResult.oauth_verifier).then(accessToken => {
        twitter.options.access_token_key = accessToken.oauth_token;
        twitter.options.access_token_secret = accessToken.oauth_token_secret;
        AsyncStorage.setItem('access_token', JSON.stringify(accessToken)).then(() => {
          twitter
          this.props.onLoginComplete();
        });
      });
      this.refs.nav.replace({
        component: ActivityIndicator,
        title: 'Login',
        passProps: {
          style: styles.indicator,
        }
      });
      return true;
    }
    return true;
  }

  render() {
    return (
      <NavigatorIOS
        ref="nav"
        initialRoute={{
          component: WebView,
          title: 'Login',
          passProps: {
            style: styles.base,
          }
        }}
        style={{flex: 1}}
      />
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingTop: 30,
  },
  indicator: {
    flex: 1,
  },
});
