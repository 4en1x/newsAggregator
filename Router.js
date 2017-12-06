import React, { Component } from 'react';
import { Text } from 'react-native';

import { StackNavigator } from 'react-navigation';
import LogIn from './src/components/logIn/logIn';
import Register from './src/components/register/register';
import SingleNews from './src/components/singleNews/singleNews.component';
import { HomeNav } from './src/components/home/homeNav';
import LikeButton from './src/components/news/likeButton.component';

class SingleNewsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.news.title,
    headerRight: (
      <LikeButton
        id={navigation.state.params.news.id}
        liked={navigation.state.params.news.like}
      />
    )
  });

  render() {
    return <SingleNews news={this.props.navigation.state.params.news} />;
  }
}

export const Feed = StackNavigator({
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      title: 'LogIn Screen'
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: 'Register Screen'
    }
  },
  Home: {
    screen: HomeNav,
    navigationOptions: {
      title: 'Home Page',
      headerLeft: null
    }
  },
  News: {
    screen: SingleNewsScreen
  }
});
