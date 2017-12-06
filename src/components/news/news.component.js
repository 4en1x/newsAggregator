import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import Swipeout from 'react-native-swipeout';

import LikeButton from './likeButton.component';
import SwipeContainer from './swipeContainer.component';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,
      isVisible: true
    };
  }

  onNewsClick() {
    this.props.navigation.navigate('News', { news: this.props.rowData });
  }

  parseDate(date) {
    const seconds = Date.now() - Date.parse(date);
    let hours = Math.floor(seconds / 360000);
    const days = Math.floor(hours / 24);
    hours -= days * 24;

    if (days === 0) {
      return `${hours}h`;
    }
    return `${days}d ${hours}h`;
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
          <TouchableWithoutFeedback onPress={this.onNewsClick.bind(this)}>
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

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column'
  },
  downContainer: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  author: {
    marginTop: 20,
    marginBottom: -20,
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'left'
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center'
  },
  dateCreated: {
    marginTop: 20,
    marginBottom: -20,
    color: '#fff',
    fontSize: 18,
    textAlign: 'left'
  },
  image: {
    height: 400
  }
});
