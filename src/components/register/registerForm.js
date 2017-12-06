import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import config from '../../../config.json';
import l10n from '../../localization';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      nickname: '',
      repeatPassword: '',
      error: '',
      showProgress: false
    };
    console.log(this.props);
  }

  onPressEmailHint = () => {
    Alert.alert(
      l10n('components.registration.emailHint.title', this.props.lan),
      l10n('components.registration.emailHint.content', this.props.lan),
      [{ text: l10n('components.registration.gotItButton', this.props.lan) }]
    );
  };

  onPressPasswordHint = () => {
    Alert.alert(
      l10n('components.registration.passwordHint.title', this.props.lan),
      l10n('components.registration.passwordHint.content', this.props.lan),
      [{ text: l10n('components.registration.gotItButton', this.props.lan) }]
    );
  };

  onPressNicknameHint = () => {
    Alert.alert(
      l10n('components.registration.nicknameHint.title', this.props.lan),
      l10n('components.registration.nicknameHint.content', this.props.lan),
      [{ text: l10n('components.registration.gotItButton', this.props.lan) }]
    );
  };

  onPressPasswordRepeatHint = () => {
    Alert.alert(
      l10n('components.registration.repeatPasswordHint.title', this.props.lan),
      l10n(
        'components.registration.repeatPasswordHint.content',
        this.props.lan
      ),
      [{ text: l10n('components.registration.gotItButton', this.props.lan) }]
    );
  };

  async onRegisterPressed() {
    if (this.state.password !== this.state.repeatPassword) {
      Alert.alert(
        l10n(
          'components.registration.errorRegister.password.title',
          this.props.lan
        ),
        l10n(
          'components.registration.errorRegister.password.content',
          this.props.lan
        ),
        [{ text: '😱' }]
      );

      return null;
    }

    this.setState({ showProgress: true });
    try {
      const response = await fetch(
        `${config.web.backendOrigin}/users/register`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            nickname: this.state.nickname
          })
        }
      );
      const res = await response.text();

      if (response.status === 409) {
        Alert.alert(
          l10n(
            `components.registration.errorRegister.${
              JSON.parse(res).error
            }.title`,
            this.props.lan
          ),
          l10n(
            `components.registration.errorRegister.${
              JSON.parse(res).error
            }.content`,
            this.props.lan
          ),
          [{ text: 'OK' }]
        );

        this.setState({ showProgress: false });
        return null;
      }

      if (response.status === 200) {
        Alert.alert(
          l10n('components.registration.helloMessage', this.props.lan),
          JSON.parse(res).nickname,
          [{ text: '😱' }]
        );
        this.setState({ showProgress: false });
        this.props.navigation.navigate('Home');
      } else {
        Alert.alert(
          l10n(
            'components.registration.errorRegister.server.title',
            this.props.lan
          ),
          l10n(
            'components.registration.errorRegister.server.content',
            this.props.lan
          ),
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
            placeholder={l10n(
              'components.registration.emailInput',
              this.props.lan
            )}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            returnKeyType="next"
            onSubmitEditing={() => {
              this.nicknameInput.focus();
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
            placeholder={l10n(
              'components.registration.nicknameInput',
              this.props.lan
            )}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            returnKeyType="next"
            onSubmitEditing={() => {
              this.passwordInput.focus();
            }}
            onChangeText={text => this.setState({ nickname: text })}
            ref={input => (this.nicknameInput = input)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={styles.hintContainer}
            onPress={this.onPressNicknameHint}
          >
            <Text style={styles.buttonText}>❔</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={l10n(
              'components.registration.passwordInput',
              this.props.lan
            )}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry
            returnKeyType="go"
            ref={input => (this.passwordInput = input)}
            onSubmitEditing={() => {
              this.passwordRepeatInput.focus();
            }}
            onChangeText={text => this.setState({ password: text })}
          />

          <TouchableOpacity
            style={styles.hintContainer}
            onPress={this.onPressPasswordHint}
          >
            <Text style={styles.buttonText}>❔</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={l10n(
              'components.registration.repeatPasswordInput',
              this.props.lan
            )}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry
            returnKeyType="go"
            ref={input => (this.passwordRepeatInput = input)}
            onChangeText={text => this.setState({ repeatPassword: text })}
          />

          <TouchableOpacity
            style={styles.hintContainer}
            onPress={this.onPressPasswordRepeatHint}
          >
            <Text style={styles.buttonText}>❔</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onRegisterPressed.bind(this)}
        >
          <Text style={styles.buttonText}>
            {l10n('components.registration.registerButton', this.props.lan)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },

  input: {
    height: 40,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },

  inputContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },

  hintContainer: {
    width: '10%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 10,
    paddingTop: 10
  },

  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 10
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  },

  loader: {
    marginVertical: 20
  }
});
