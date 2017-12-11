import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native';

import Swipeout from 'react-native-swipeout';
import LikeButton from '../likeButton/likeButton.component';
import SwipeContainer from '../swipeContainer/swipeContainer.component';
import styles from './news.styled';
import l10n from '@/helpers/localization';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      lan: 'en'
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({ lan: value });
    });
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

  onNewsClick() {
    this.props.navigation.navigate('News', { news: this.props.rowData });
  }

  parseDate(date) {
    const hPrefix = l10n('components.news.hPrefix', this.state.lan);
    const dPrefix = l10n('components.news.dPrefix', this.state.lan);
    const seconds = Date.now() - Date.parse(date);
    let hours = Math.floor(seconds / 360000);
    const days = Math.floor(hours / 24);
    hours -= days * 24;

    if (days === 0) {
      return `${hours}${hPrefix}`;
    }
    return `${days}${dPrefix} ${hours}${hPrefix}`;
  }

  handleVisible = event => {
    this.setState({ isVisible: event });
  };

  render() {
    if (!this.state.isVisible) {
      return null;
    }
    return (
      <Swipeout
        right={[
          {
            component: (
              <SwipeContainer
                id={this.props.rowData.id}
                onDelete={this.handleVisible}
              />
            )
          }
        ]}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: this.props.rowData.urlToImage }}
          />
          <TouchableWithoutFeedback onPress={() => this.onNewsClick()}>
            <View style={styles.textContainer}>
              <View height="90%">
                <Text style={styles.title}>{this.props.rowData.title}</Text>
              </View>
              <View height="10%" style={styles.downContainer}>
                <Text style={styles.dateCreated}>
                  {this.parseDate(this.props.rowData.publishedAt)}
                </Text>
                <Text style={styles.author}>{this.props.rowData.author}</Text>
                <LikeButton
                  id={this.props.rowData.id}
                  liked={this.props.rowData.like}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Swipeout>
    );
  }
}

export default News;
