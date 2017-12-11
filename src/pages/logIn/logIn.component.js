import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import LoginForm from './components/loginForm.component';
import l10n from '../../helpers/localization';
import ChooseLanguageModal from '@/components/Modal/chooseLanguageModal.component';
import styles from './logIn.styled';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: 'ru',
      isModalVisible: false
    };
  }

  _showModal = () => this.setState({ isModalVisible: true });

  handleLanguage = langValue => {
    this.setState({ lan: langValue });
  };

  handleModalVisible = event => {
    this.setState({ isModalVisible: event });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity
          style={styles.settingsContainer}
          onPress={this._showModal.bind(this)}
        >
          <Text style={styles.settingsText}>
            {l10n('components.login.settingsLabel', this.state.lan)}
          </Text>
        </TouchableOpacity>

        <ChooseLanguageModal
          onSelectLanguage={this.handleLanguage}
          onClose={this.handleModalVisible}
          transparent
          visible={this.state.isModalVisible}
          lan={this.state.lan}
        />

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../images/octopus.png')}
          />
          <Text style={styles.title}>
            {l10n('components.login.applicationName', this.state.lan)}
          </Text>
        </View>

        <View>
          <LoginForm
            navigation={this.props.navigation}
            lan={this.state.lan}
            onchangeLanguage={this.handleLanguage}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

