import React, {Component} from 'react';
import {
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  Text,
  Modal,
  View,
  WebView,
  AsyncStorage,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeTimeline from 'Twitter/src/containers/HomeTimeline';
import SubMenu from 'Twitter/src/containers/SubMenu';
import Post from 'Twitter/src/containers/Post';
import Login from 'Twitter/src/containers/Login';

export default class AppRoot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: null,
      modalVisible: false,
      oauthModalVisible: false,
      url: null,
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('access_token').then((result) => {
      if (result) {
        this._setSelectTab('home');
      } else {
        this._showTwitterAuthorize();
      }
    });
  }

  _setSelectTab(tab) {
    this.setState({
      selectedTab: tab,
    });
  }

  _setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  _showTwitterAuthorize() {
    this.setState({
      oauthModalVisible: true,
    });
  }

  _onLoginComplete() {
    this.setState({
      oauthModalVisible: false,
      selectedTab: 'home',
    });
  }

  _onLogoutComplete() {
    this._showTwitterAuthorize();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TabNavigator>
          <TabNavigator.Item
            title="Tweet"
            selected={this.state.selectedTab === 'home'}
            onPress={this._setSelectTab.bind(this, 'home')}
          >
            <NavigatorIOS
              initialRoute={{
                component: HomeTimeline,
                title: 'Home',
                rightButtonTitle: 'Add',
                onRightButtonPress: this._setModalVisible.bind(this, true),
              }}
              style={{flex: 1}}
            />
          </TabNavigator.Item>
          <TabNavigator.Item
            title="Menu"
            selected={this.state.selectedTab === 'menu'}
            onPress={this._setSelectTab.bind(this, 'menu')}
          >
            <SubMenu onLogoutComplete={this._onLogoutComplete.bind(this)}/>
          </TabNavigator.Item>
        </TabNavigator>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
        >
          <NavigatorIOS
            initialRoute={{
              component: Post,
              title: 'つぶやく',
              rightButtonTitle: 'Close',
              onRightButtonPress: this._setModalVisible.bind(this, false),
              passProps: {
                onCompletePost: this._setModalVisible.bind(this, false)
              }
            }}
            style={{flex: 1}}
          />
        </Modal>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.oauthModalVisible}
        >
          <Login onLoginComplete={this._onLoginComplete.bind(this)} />
        </Modal>
      </View>
    );
  }
}
