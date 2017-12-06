import React, { Component } from 'react';
import { View, TextInput, Text, DatePickerIOS } from 'react-native';
import styles from './addNews.styled';

export default class addNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Заголовок',
      author: 'Автор',
      date: new Date()
    };
  }

  onDateChange(date) {
    this.setState({ date });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.largeInput, styles.input]}
          placeholder={this.state.title}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          multiline
          numberOfLines={4}
          returnKeyType="next"
          onChangeText={text => this.setState({ title: text })}
        />
        <TextInput
          style={[styles.smallInput, styles.input]}
          placeholder={this.state.author}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          returnKeyType="next"
          onChangeText={text => this.setState({ author: text })}
        />
        <View style={styles.dateView}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateHint}>Date + time picker</Text>
            <DatePickerIOS
              date={this.state.date}
              mode="datetime"
              onDateChange={this.onDateChange.bind(this)}
            />
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateHint}>Date picker</Text>
            <DatePickerIOS
              date={this.state.date}
              mode="date"
              onDateChange={this.onDateChange.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}
