import React, { Component } from 'react';
import { Text, TextInput, ScrollView, View, StyleSheet, AsyncStorage } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from 'Twitter/src/components/Button';
import twitter from 'Twitter/src/commons/TwitterManager';

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
            containerStyle={styles.sendButtonContainer}
            textStyle={styles.sendButtonText}
            onPress={this._postTweet.bind(this)}
            disabled={!this.state.text.length}
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
  sendButtonContainer: {
    backgroundColor: '#1DA1F2',
    borderColor: 'rgba(0,0,0,0)',
  },
  sendButtonText: {
    color: '#FFFFFF',
  },
});
