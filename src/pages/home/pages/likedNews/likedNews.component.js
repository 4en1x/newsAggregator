import React, { Component } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View } from 'react-native';

import News from '../../components/news/news.component';
import config from '@/config/config.json';
import styles from './likedNews.styled';

export default class LikedNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      page: 1,
      refreshing: false
    };

    this.loadAll(this.state.page);
  }

  loadAll(page) {
    this.lodeNews(page).then(
      result => {
        this.setState({
          dataSource: result,
          refreshing: false
        });
      },
      error => {
        this.setState({
          refreshing: false
        });
        alert(`Rejected: ${error.message}`);
      }
    );
  }

  async loadMore() {
    try {
      this.lodeNews(this.state.page).then(
        result => {
          result = this.state.dataSource.concat(result);
          this.setState((prevState, props) => ({
            dataSource: result
          }));
        },
        error => alert(`Rejected: ${error.message}`)
      );
    } catch (error) {
      this.setState({ error });
      console.log(`error ${error}`);
    }
  }

  async lodeNews(page) {
    try {
      const response = await fetch(
        `${config.web.backendOrigin}/articles/liked/${page}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      const res = await response.text();

      if (response.status === 200) {
        this.setState((prevState, props) => ({ page: prevState.page + 1 }));

        return JSON.parse(res);
      }
      throw res;
    } catch (error) {
      this.setState({ error });
      console.log(`error ${error}`);
    }

    return null;
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true,
        page: 1
      },
      () => this.loadAll(1)
    );
  }

  render() {
    if (this.state.dataSource.length === 0) {
      return (
        <View>
          <ActivityIndicator size="large" color="#aa3300" />
          <FlatList
            style={styles.container}
            data={this.state.dataSource}
            refreshing={this.state.refreshing}
            renderItem={rowData => (
              <News rowData={rowData.item} navigation={this.props.navigation} />
            )}
            onEndReached={() => this.loadMore()}
            onRefresh={() => this.handleRefresh()}
          />
        </View>
      );
    }

    return (
      <FlatList
        style={styles.container}
        data={this.state.dataSource}
        refreshing={this.state.refreshing}
        renderItem={rowData => (
          <News rowData={rowData.item} navigation={this.props.navigation} />
        )}
        onEndReached={() => this.loadMore()}
        onRefresh={() => this.handleRefresh()}
        keyExtractor={item => item.id}
      />
    );
  }
}
