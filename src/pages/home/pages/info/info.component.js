import React, { Component } from 'react';
import {
  View,
  Picker,
  AsyncStorage,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './info.styled';
import l10n from '~/helpers/localization';
import config from '~/config/config.json';

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: 'en',
      connect: true
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

  async disconnect() {
    if (this.state.connect) {
      config.web.backendOrigin = {};
    } else {
      config.web.backendOrigin = config.web.backendOriginCopy;
      await AsyncStorage.setItem('justUpdateConnection', 'true');
    }

    this.setState(prevState => ({
      connect: !prevState.connect
    }));

    return null;
  }

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
          <Picker.Item label="German" value="de" />
          <Picker.Item label="Chinese" value="ch" />
        </Picker>

        <TouchableOpacity
          style={styles.registrationButtonContainer}
          onPress={() => this.disconnect()}
        >
          <Text style={styles.buttonText}>
            {this.state.connect
              ? l10n('components.settings.disconnect', this.state.lan)
              : l10n('components.settings.connect', this.state.lan)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
