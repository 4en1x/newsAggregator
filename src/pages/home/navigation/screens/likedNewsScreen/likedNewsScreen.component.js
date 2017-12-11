import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';

import LikedNews from '../../../pages/likedNews/likedNews.component';
import styles from './likedNewsScreen.styled';
import l10n from '@/helpers/localization';

class LikedNewsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: l10n('navigation.tabs.likedNews', navigation.state.params.lan),
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('@/images/love.png')}
        style={[styles.icon, { tintColor }]}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      lan: 'en'
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.props.navigation.setParams({
        lan: value
      });
    });
  }

  componentDidMount() {
    setInterval(() => {
      AsyncStorage.getItem('language').then(value => {
        if (value !== this.state.lan) {
          this.props.navigation.setParams({
            lan: value
          });
          this.setState({ lan: value });
        }
      });
    }, 1000);
  }

  render() {
    return <LikedNews navigation={this.props.navigation} />;
  }
}

export default LikedNewsScreen;
