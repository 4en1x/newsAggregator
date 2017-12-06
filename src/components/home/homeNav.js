import { TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

import Home from './home';
import LikedNews from './likedNews';
import Info from './info';
import AddNews from '../addNews/addNews.component';

class NewsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'News',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/home.png')}
        style={[styles.icon, { tintColor }]}
      />
    )
  };

  render() {
    return <Home navigation={this.props.navigation} />;
  }
}

class LikedNewsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Liked News',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/love.png')}
        style={[styles.icon, { tintColor }]}
      />
    )
  };

  render() {
    return <LikedNews navigation={this.props.navigation} />;
  }
}

class InfoScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Info',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/info.png')}
        style={[styles.icon, { tintColor }]}
      />
    )
  };

  render() {
    return <Info navigation={this.props.navigation} />;
  }
}

class AddNewsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Add News',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/plus-sign.png')}
        style={[styles.icon, { tintColor }]}
      />
    )
  };

  render() {
    return <AddNews navigation={this.props.navigation} />;
  }
}

export const HomeNav = TabNavigator(
  {
    Home: {
      screen: NewsScreen
    },
    LikedNews: {
      screen: LikedNewsScreen
    },
    Info: {
      screen: InfoScreen
    },
    AddNews: {
      screen: AddNewsScreen
    }
  },
  {
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63'
    }
  }
);

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});
