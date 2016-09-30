import React, { Component } from 'react';
import { Text, TextInput, ScrollView, View, StyleSheet, AsyncStorage } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../components/Button';
import twitter from '../commons/TwitterManager';

export default class Post extends Component {

  static propTypes = {
    onCompletePost: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  _postTweet() {
    const params = {
      status: this.state.text
    };
    return twitter.post('/statuses/update.json', params)
      .then(() => {
        this.props.onCompletePost();
      });
  }

  render() {
    const textCount = 140 - this.state.text.length;
    return (
      <View style={styles.base}>
        <View style={{flex: 1}}>
          <TextInput
            style={styles.input}
            multiline={true}
            maxLength={140}
            placeholder="いまどうしてる？"
            autoFocus={true}
            value={this.state.text}
            onChangeText={(text) => this.setState({text})}
          />
        </View>
        <View style={styles.actionsArea}>
          <Text style={styles.textCount}>
            {textCount}
          </Text>
          <Button
            style={styles.sendButton}
            onPress={this._postTweet.bind(this)}
          >
            ツイート
          </Button>
        </View>
        <KeyboardSpacer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingTop: 70
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 15,
  },
  actionsArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopColor: '#E1E8ED',
    borderTopWidth: 1,
    padding: 5,
  },
  textCount: {
    color: '#657786',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#1DA1F2',
    color: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  }
});