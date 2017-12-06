import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Alert
} from 'react-native';

import config from '../../../config.json';

export default class SwipeContainer extends Component {
  constructor(props) {
    super(props);
  }

  onPressButton() {
    console.log('press');
  }

  _handleDeleteNews() {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this news?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this.deleteNews() }
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

      console.log(this.props);
    } catch (error) {
      console.log(`error ${error}`);
      this.setState({ error });
    }
  }

  render() {
    return (
      <View style={styles.swipeContainer}>
        <TouchableOpacity
          style={styles.swipeButtonContainer}
          onPress={this.onPressButton}
        >
          <Image
            source={require('../../images/spanner.png')}
            style={[styles.icon, { tintColor: '#76e943' }]}
          />
          <Text style={styles.swipeButtonText}>Update news</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.swipeButtonContainer}
          onPress={this._handleDeleteNews.bind(this)}
        >
          <Image
            source={require('../../images/cross.png')}
            style={[styles.icon, { tintColor: '#e91e63' }]}
          />
          <Text style={styles.swipeButtonText}>Delete news</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 52,
    height: 52
  },
  swipeContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  swipeButtonContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  swipeButtonText: {
    marginTop: 10
  }
});
