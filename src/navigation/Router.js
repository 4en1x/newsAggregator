import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import LogIn from '~/pages/logIn/logIn.component';
import Register from '~/pages/registration/register.component';
import SingleNews from '~/pages/home/components/singleNews/singleNews.component';
import HomeNav from '~/pages/home/navigation/homeNav';
import LikeButton from '~/pages/home/components/likeButton/likeButton.component';

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

class HomeScreen extends Component {
  static navigationOptions = {
    headerLeft: null
  };

  render() {
    return (
      <HomeNav
        screenProps={{
          handleChangeLang: langValue => {
            this.setState({ lan: langValue });
          }
        }}
        navigation={this.props.navigation}
      />
    );
  }
}

HomeScreen.router = HomeNav.router;

const Feed = StackNavigator({
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
    screen: HomeScreen
  },
  News: {
    screen: SingleNewsScreen
  }
});

export default Feed;
