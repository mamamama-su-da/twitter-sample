import React, {Component} from 'react';
import {
  View,
} from 'react-native';
import Tweet from 'Twitter/src/components/Tweet'
import Twitter from 'Twitter/src/commons/Twitter'
import {twitterApp} from 'Twitter/src/config/config'

export default class extends Component {
  constructor() {
    super();

    // このコンポーネントで管理する state を定義
    this.state = {
      tweet: null, // デフォルトに設定するべきものがないので、いったん null
    };
  }

  componentDidMount() { // コンポーネントが描画された直後に呼ばれる特別な関数
    // Twitter APIを叩くためのクライアントを生成
    let client = new Twitter({
      consumer_key: twitterApp.consumerKey,
      consumer_secret: twitterApp.consumerSecret,
    });

    // 指定したIDのユーザーのタイムラインを取得する
    let param = {
      screen_name: '29reach',
      count: 20,
    };
    client.get('/statuses/user_timeline.json', param)
      .then(tweets => {
        console.log('tweets', tweets); // ログに出力されるので内容をみてみましょう
        if (tweets.length) {

          // まだリスト構造の実装をしていないので、1件目のみ使う
          let tweet = tweets[0];

          // state を更新する
          this.setState({
            tweet: {
              id: tweet.id_str,
              profileImageUrl: tweet.user.profile_image_url_https,
              userName: tweet.user.name,
              userId: tweet.user.screen_name,
              time: tweet.created_at,
              text: tweet.text,
              extendedEntities: tweet.extended_entities,
            }
          });
        }
      });
  }

  render() {
    let content;
    if (this.state.tweet) {
      content = (
        // ...object という書き方は、例えば object = { a: 'XX', b: 'YY' } の場合、下記と同義
        // <Tweet a="XX" b="YY" />
        <Tweet {...this.state.tweet} />
      );
    }

    return (
      <View style={{ marginTop: 20 }}>
        {content}
      </View>
    );
  }
}
