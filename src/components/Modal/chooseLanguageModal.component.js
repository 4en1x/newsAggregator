import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Picker,
  Modal
} from 'react-native';
import l10n from '../../helpers/localization';

export default class ChooseLanguageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: this.props.lan
    };
  }

  handleLangChange = lang => {
    this.props.onSelectLanguage(lang);
    this.setState({ lan: lang });
  };

  handleClose = () => this.props.onClose(false);

  render() {
    return (
      <Modal transparent={this.props.transparent} visible={this.props.visible}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: 180,
              height: 250,
              backgroundColor: '#fff',
              borderRadius: 20
            }}
          >
            <TouchableOpacity
              style={styles.languageContainer}
              onPress={() => this.handleClose()}
            >
              <Text style={styles.languageButton}>
                {l10n('components.modal.closeButton', this.state.lan)}
              </Text>
            </TouchableOpacity>

            <Picker
              selectedValue={this.props.lan}
              onValueChange={(itemValue, itemIndex) =>
                this.handleLangChange(itemValue)
              }
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Russian" value="ru" />
              <Picker.Item label="Spanish" value="sp" />
            </Picker>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  languageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  languageButton: {
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 0.9,
    marginTop: 10,
    color: '#ff0d23'
  }
});
