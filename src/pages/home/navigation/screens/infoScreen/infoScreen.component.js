import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';

import Info from '../../../pages/info/info.component';
import styles from './infoScreen.styled';
import l10n from '@/helpers/localization';

class InfoScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: l10n('navigation.tabs.settings', navigation.state.params.lan),
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('@/images/info.png')}
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

  handleLanguage = langValue => {
    this.props.screenProps.handleChangeLang(langValue);
  };

  render() {
    return (
      <Info
        navigation={this.props.navigation}
        onchangeLanguage={langValue => this.handleLanguage(langValue)}
      />
    );
  }
}

export default InfoScreen;
