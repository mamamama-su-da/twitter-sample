import React, {Component} from 'react';
import {
  StyleSheet,
  ListView,
  View,
  ActivityIndicator,
} from 'react-native';
import Tweet from 'Twitter/src/components/Tweet';

export default class Tweets extends Component {
  static propTypes = {
    tweets: React.PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  }

  render() {
    if (this.props.tweets.length) {
      return (
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.props.tweets)}
          renderRow={(tweet) => <Tweet key={tweet.id} {...tweet} />}
          renderSeparator={this._renderSeparator}
          initialListSize={200}
          pageSize={20}
          scrollRenderAheadDistance={500}
        />
      );
    } else {
      return <ActivityIndicator style={styles.indicator}/>;
    }
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={styles.separator}
      />
    );
  }
}

const styles = StyleSheet.create({
  indicator: {
    margin: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#E1E8ED',
  },
});
