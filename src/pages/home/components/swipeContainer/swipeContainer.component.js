import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  AsyncStorage
} from 'react-native';

import config from '@/config/config.json';
import styles from './swipeContainer.styled';
import l10n from '@/helpers/localization';

export default class SwipeContainer extends Component {
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

  handleDeleteNews() {
    Alert.alert(
      l10n('components.swipeContainer.deleteAlert.title', this.state.lan),
      l10n('components.swipeContainer.deleteAlert.description', this.state.lan),
      [
        {
          text: l10n(
            'components.swipeContainer.deleteAlert.cancelButton',
            this.state.lan
          ),
          style: 'cancel'
        },
        {
          text: l10n(
            'components.swipeContainer.deleteAlert.okButton',
            this.state.lan
          ),
          onPress: () => this.deleteNews()
        }
      ],
      { cancelable: false }
    );
  }

  async deleteNews() {
    try {
      const response = await fetch(
        `${config.web.backendOrigin}/articles/${this.props.id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      const res = await response.text();

      if (response.status !== 200) {
        throw res;
      }

      this.props.onDelete(false);
    } catch (error) {
      console.log(`error ${error}`);
      this.setState({ error });
    }
  }

  render() {
    return (
      <View style={styles.swipeContainer}>
        <TouchableOpacity style={styles.swipeButtonContainer}>
          <Image
            source={require('@/images/spanner.png')}
            style={[styles.icon, { tintColor: '#76e943' }]}
          />
          <Text style={styles.swipeButtonText}>
            {l10n('components.swipeContainer.updateOption', this.state.lan)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.swipeButtonContainer}
          onPress={() => this.handleDeleteNews()}
        >
          <Image
            source={require('@/images/cross.png')}
            style={[styles.icon, { tintColor: '#e91e63' }]}
          />
          <Text style={styles.swipeButtonText}>
            {l10n('components.swipeContainer.deleteOption', this.state.lan)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
