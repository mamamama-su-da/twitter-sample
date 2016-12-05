import React, {Component} from 'react';
import twitter from 'Twitter/src/commons/TwitterManager';
import {
  StyleSheet,
  ScrollView,
  View,
  RefreshControl,
} from 'react-native';
import Tweets from 'Twitter/src/components/Tweets';

export default class HomeTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this._loadTimeline().then((loadedTweets) => {
      this.setState({
        tweets: loadedTweets,
      });
    });
  }

  _onRefresh() {
    let {tweets} = this.state;
    let params;
    if (tweets.length) {
      params = {
        since_id: tweets[0].id
      };
    }

    this.setState({refreshing: true});
    this._loadTimeline(params).then((loadedTweets) => {
      if (loadedTweets.length) {

        const newTweets = tweets.slice();
        newTweets.unshift(...loadedTweets);

        this.setState({
          tweets: newTweets,
        });
      }
      this.setState({
        refreshing: false,
      });
    });
  }

  _loadTimeline(params) {

    return twitter.get('/statuses/home_timeline.json', Object.assign({}, { count: 200 }, params))
      .then(tweets => {
        if (tweets.length) {
          return tweets.map((tweet => {
            return {
              id: tweet.id_str,
              profileImageUrl: tweet.user.profile_image_url_https,
              userName: tweet.user.name,
              userId: tweet.user.screen_name,
              time: tweet.created_at,
              text: tweet.text,
              extendedEntities: tweet.extended_entities,
            };
          }));
        }
        return [];
      });
  }

  render() {
    return (
      <ScrollView
        style={styles.base}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <Tweets
          tweets={this.state.tweets}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#EEEEEE',
  },
});
