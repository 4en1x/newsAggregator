import React, { Component } from 'react';
import { View, Picker, AsyncStorage, Text } from 'react-native';
import styles from './info.styled';
import l10n from '@/helpers/localization';
import config from '@/config/config.json';

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: 'en'
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({ lan: value });
    });
  }

  async changeLang(language) {
    try {
      const response = await fetch(
        `${config.web.backendOrigin}/users/changeLang`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ language })
        }
      );

      const res = await response.text();

      if (response.status !== 200) {
        throw res;
      }
    } catch (error) {
      this.setState({ error });
      console.log(`error ${error}`);
    }
  }

  handleLangChange = lang => {
    this.setState({ lan: lang });
    AsyncStorage.setItem('language', lang);
    this.props.onchangeLanguage(lang);
    this.changeLang(lang);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {l10n('components.settings.title', this.state.lan)}
        </Text>
        <Picker
          selectedValue={this.state.lan}
          onValueChange={itemValue => this.handleLangChange(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Russian" value="ru" />
          <Picker.Item label="Spanish" value="sp" />
        </Picker>
      </View>
    );
  }
}
