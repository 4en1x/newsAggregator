import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class SingleNews extends Component {
  render() {
    return <WebView source={{ uri: this.props.news.url }} />;
  }
}
