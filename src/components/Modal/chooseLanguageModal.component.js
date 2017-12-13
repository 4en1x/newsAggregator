import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Picker, Modal } from 'react-native';
import l10n from '../../helpers/localization';
import styles from './chooseLanguageModal.styled';

class ChooseLanguageModal extends Component {
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
        <View style={styles.container}>
          <View style={styles.wrapper}>
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
              onValueChange={itemValue => this.handleLangChange(itemValue)}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Russian" value="ru" />
              <Picker.Item label="Spanish" value="sp" />
              <Picker.Item label="German" value="de" />
              <Picker.Item label="Chinese" value="ch" />
            </Picker>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ChooseLanguageModal;
