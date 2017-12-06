import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity
} from 'react-native';
import RegisterForm from './registerForm';
import l10n from '../../localization';
import ChooseLanguageModal from '../Modal/chooseLanguageModal.component';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: this.props.navigation.state.params.lan,
      isModalVisible: false
    };
    console.log(this.props);
  }

  _showModal = () => this.setState({ isModalVisible: true });

  handleLanguage = langValue => {
    this.setState({ lan: langValue });
    this.props.navigation.state.params.handleChangeLang(langValue);
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
            source={require('../../images/cthulhu.png')}
          />
          <Text style={styles.title}>
            {l10n('components.registration.title', this.state.lan)}
          </Text>
        </View>

        <View>
          <RegisterForm
            navigation={this.props.navigation}
            lan={this.state.lan}
            onchangeLanguage={this.handleLanguage}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },

  settingsContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 10
  },

  settingsText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.9
  },

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },

  logo: {
    height: 200,
    width: 200
  },

  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    opacity: 0.9
  }
});
