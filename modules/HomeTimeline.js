import React, {Component} from 'react';
import twitter from '../commons/TwitterManager';
import Tweet from '../components/Tweet';
import {
  StyleSheet,
  ListView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  AsyncStorage,
} from 'react-native';

export default class HomeTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id}),
      refreshing: false,
    };
    this.rawListData = [];
  }

  componentDidMount() {
    this._loadTimeline().then((loadedTweets) => {
      this.rawListData = loadedTweets;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rawListData),
      });
    });
  }

  _onRefresh() {
    let params;
    if (this.rawListData.length) {
      params = {
        since_id: this.rawListData[0].id
      };
    }

    this.setState({refreshing: true});
    this._loadTimeline(params).then((loadedTweets) => {
      if (loadedTweets.length) {
        const newListData = this.rawListData.slice();
        newListData.unshift(...loadedTweets);
        this.rawListData = newListData;

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rawListData),
          refreshing: false,
        });
      }
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
    let indicator;
    if (!this.state.dataSource.rowIdentities.length) {
      indicator = <ActivityIndicator style={styles.indicator}/>;
    }

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
        {indicator}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Tweet key={rowData.id} {...rowData} />}
          renderSeparator={this._renderSeparator}
          initialListSize={200}
          pageSize={20}
          scrollRenderAheadDistance={500}
        />
      </ScrollView>
    );
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return <View
      key={`${sectionID}-${rowID}`}
      style={{
        height: 1,
        backgroundColor: '#E1E8ED',
      }}
    />;
  }
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#EEEEEE',
  },
  indicator: {
    margin: 10,
  },
});
