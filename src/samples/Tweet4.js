import React, {Component} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import Tweets from 'Twitter/src/components/Tweets'
import Twitter from 'Twitter/src/commons/Twitter'
import {twitterApp} from 'Twitter/src/config/config'

export default class extends Component {
  constructor() {
    super();

    this.state = {
      tweets: [], // 今度は配列にする
    };
  }

  componentDidMount() {
    let client = new Twitter({
      consumer_key: twitterApp.consumerKey,
      consumer_secret: twitterApp.consumerSecret,
    });

    let param = {
      screen_name: '29reach',
      count: 20,
    };
    client.get('/statuses/user_timeline.json', param)
      .then(tweets => {
        console.log('tweets', tweets);
        if (tweets.length) {

          // state を更新する
          this.setState({
            tweets: tweets.map((tweet => {
              return {
                id: tweet.id_str,
                profileImageUrl: tweet.user.profile_image_url_https,
                userName: tweet.user.name,
                userId: tweet.user.screen_name,
                time: tweet.created_at,
                text: tweet.text,
                extendedEntities: tweet.extended_entities,
              };
            }))
          });
        }
      });
  }

  render() {
    return (
      <ScrollView
        style={{ paddingTop: 20, backgroundColor: '#EEEEEE' }}
      >
        <Tweets tweets={this.state.tweets} />
      </ScrollView>
    );
  }
}
