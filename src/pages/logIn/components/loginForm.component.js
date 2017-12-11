import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import config from '@/config/config.json';
import l10n from '@/helpers/localization';
import styles from './loginForm.styled';

class loginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      showProgress: false
    };
  }

  onPressEmailHint = () => {
    Alert.alert(
      l10n('components.login.emailHint.title', this.props.lan),
      l10n('components.login.emailHint.content', this.props.lan),
      [{ text: l10n('components.login.gotItButton', this.props.lan) }]
    );
  };

  onPressPasswordHint = () => {
    Alert.alert(
      l10n('components.login.passwordHint.title', this.props.lan),
      l10n('components.login.passwordHint.content', this.props.lan),
      [{ text: l10n('components.login.gotItButton', this.props.lan) }]
    );
  };

  onPressRegisterButton = () => {
    this.props.navigation.navigate('Register', {
      lan: this.props.lan,
      handleChangeLang: langValue => this.props.onchangeLanguage(langValue)
    });
  };

  onPressForgotButton = () => {
    Alert.alert(
      l10n('components.login.forgotPasswordButton.title', this.props.lan),
      l10n('components.login.forgotPasswordButton.content', this.props.lan),
      [{ text: '😱' }]
    );
  };

  async onLoginPressed() {
    this.setState({ showProgress: true });
    try {
      const response = await fetch(`${config.web.backendOrigin}/users/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      });
      const res = await response.text();
      if (response.status === 200) {
        Alert.alert(
          l10n('components.login.helloMessage', this.props.lan),
          JSON.parse(res).nickname,
          [{ text: '😱' }]
        );

        AsyncStorage.setItem('language', JSON.parse(res).language);

        this.setState({ showProgress: false });
        this.props.navigation.navigate('Home', {
          navigation: this.props.navigation
        });
      } else {
        Alert.alert(
          l10n('components.login.errorLoginMessage.title', this.props.lan),
          l10n('components.login.errorLoginMessage.content', this.props.lan),
          [{ text: '😱' }]
        );
        throw res;
      }
    } catch (error) {
      this.setState({ error });
      console.log(`error ${error}`);
      this.setState({ showProgress: false });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={this.state.showProgress}
          size="large"
          color="#aa3300"
          style={styles.loader}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={l10n('components.login.emailInput', this.props.lan)}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            returnKeyType="next"
            onSubmitEditing={() => {
              this.passwordInput.focus();
            }}
            onChangeText={text => this.setState({ email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={styles.hintContainer}
            onPress={this.onPressEmailHint}
          >
            <Text style={styles.buttonText}>❔</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={l10n('components.login.passwordInput', this.props.lan)}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry
            returnKeyType="go"
            ref={input => (this.passwordInput = input)}
            onChangeText={text => this.setState({ password: text })}
          />

          <TouchableOpacity
            style={styles.hintContainer}
            onPress={this.onPressPasswordHint}
          >
            <Text style={styles.buttonText}>❔</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onLoginPressed.bind(this)}
        >
          <Text style={styles.buttonText}>
            {l10n('components.login.loginButton', this.props.lan)}
          </Text>
        </TouchableOpacity>

        <View style={styles.registrationContainer}>
          <TouchableOpacity
            style={styles.registrationButtonContainer}
            onPress={this.onPressRegisterButton}
          >
            <Text style={styles.buttonText}>
              {l10n('components.login.registerButton', this.props.lan)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registrationButtonContainer}
            onPress={this.onPressForgotButton}
          >
            <Text style={styles.buttonText}>
              {l10n('components.login.forgotPassword', this.props.lan)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default loginForm;
