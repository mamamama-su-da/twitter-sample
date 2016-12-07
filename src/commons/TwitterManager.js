import { AsyncStorage, } from 'react-native';
import { twitterApp } from 'Twitter/src/config/config.json';
import Twitter from './Twitter';

const client = new Twitter({
  consumer_key: twitterApp.consumerKey,
  consumer_secret: twitterApp.consumerSecret,
});

(function() {
  AsyncStorage.getItem('access_token').then((result) => {
    if (result) {
      const user = JSON.parse(result);
      client.options.access_token_key = user.oauth_token;
      client.options.access_token_secret = user.oauth_token_secret;
    }
  });
})();

export default client;
