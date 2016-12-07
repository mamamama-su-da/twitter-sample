/**
 * ツイート
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import LightBox from 'react-native-lightbox';
import FitImage from 'react-native-fit-image';
import _ from 'lodash';
import moment from 'moment';

export default class Tweet extends Component {

  /*
     <Tweet
       profileImageUrl="https://dummyimage.com/600x400/000/fff"
       userName="ニクリーチ"
       userId="29reach"
       time="2016/12/08 18:00:00"
       text="肉食べたい"
     />
   */
  static propTypes = {
    profileImageUrl: React.PropTypes.string.isRequired,
    userName: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    time: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    extendedEntities: React.PropTypes.object,
  };

  render() {
    return (
      <View style={styles.tweet}>
        <View style={styles.leftArea}>
          <Image style={styles.userIcon}
                 source={{uri: this.props.profileImageUrl.replace('_normal', '')}}
          />
        </View>
        <View style={styles.rightArea}>
          <View style={styles.head}>
            <Text style={styles.user} numberOfLines={1}>
              <Text style={styles.userName}>{this.props.userName}</Text>
              <Text style={styles.userId}>@{this.props.userId}</Text>
            </Text>
            <Text style={styles.time}>
              {moment(new Date(this.props.time)).format('M月D日 HH:mm:ss')}
            </Text>
          </View>
          <Text>
            {this.props.text}
          </Text>
          {_.map(_.get(this.props.extendedEntities, 'media'), mediaItem => {
            return <LightBox navigator={this.props.navigator} key={mediaItem.id} style={styles.image}>
              <View>
                <FitImage
                  source={{uri: mediaItem.media_url_https + ':small'}}
                />
              </View>
            </LightBox>
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tweet: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  leftArea: {
    paddingRight: 5,
  },
  rightArea: {
    flex: 1,
    paddingLeft: 5,
  },
  userIcon: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#E1E8ED',
  },
  head: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  user: {
    flexDirection: 'row',
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  userId: {
    marginLeft: 5,
    color: '#657786',
    fontSize: 11,
  },
  time: {
    marginLeft: 5,
    color: '#657786',
    fontSize: 11,
  },
  image: {
    marginTop: 5,
    borderRadius: 5,
    height: 150,
    overflow: 'hidden',
    justifyContent: 'center',
  },
});
