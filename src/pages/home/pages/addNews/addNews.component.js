import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  DatePickerIOS,
  AsyncStorage
} from 'react-native';
import styles from './addNews.styled';
import l10n from '@/helpers/localization';

export default class addNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      author: '',
      date: new Date(),
      lan: 'en'
    };
  }

  onDateChange(date) {
    this.setState({ date });
  }

  componentDidMount() {
    setInterval(() => {
      AsyncStorage.getItem('language').then(value => {
        if (value !== this.state.lan) {
          this.setState({ lan: value });
        }
      });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.largeInput, styles.input]}
          placeholder={l10n('components.addNews.title', this.state.lan)}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          multiline
          numberOfLines={4}
          returnKeyType="next"
          onChangeText={text => this.setState({ title: text })}
        />
        <TextInput
          style={[styles.smallInput, styles.input]}
          placeholder={l10n('components.addNews.author', this.state.lan)}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          returnKeyType="next"
          onChangeText={text => this.setState({ author: text })}
        />
        <View style={styles.dateView}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateHint}>
              {l10n('components.addNews.dtPicker', this.state.lan)}
            </Text>
            <DatePickerIOS
              date={this.state.date}
              mode="datetime"
              onDateChange={date => this.onDateChange(date)}
            />
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateHint}>
              {l10n('components.addNews.dPicker', this.state.lan)}
            </Text>
            <DatePickerIOS
              date={this.state.date}
              mode="date"
              onDateChange={date => this.onDateChange(date)}
            />
          </View>
        </View>
      </View>
    );
  }
}
