import React, {Component} from 'react';
import {
  View,
} from 'react-native';
import Tweet from 'Twitter/src/components/Tweet'

export default class extends Component {
  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Tweet
          // Twitter/src/components/Tweet.js の実装を見てみよう
          profileImageUrl="https://dummyimage.com/600x400/000/fff"
          userName="ニクリーチ"
          userId="29reach"
          time="2016/12/08 18:00:00"
          text="肉食べたい"
        />
      </View>
    );
  }
}
