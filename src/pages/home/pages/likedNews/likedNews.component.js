import React, { Component } from 'react';
import { FlatList, ActivityIndicator, View, AsyncStorage } from 'react-native';

import News from '../../components/news/news.component';
import config from '~/config/config.json';

export default class LikedNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      page: 1,
      refreshing: false,
      networkError: false
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

        AsyncStorage.setItem('justUpdateConnection', 'false');
        AsyncStorage.setItem('likedNews', JSON.stringify(result));
      },
      error => {
        alert(`Rejected: ${error.message}`);
      }
    );
  }

  async loadMore() {
    try {
      const isUpdate = await AsyncStorage.getItem('justUpdateConnection');
      this.lodeNews(this.state.page).then(
        result => {
          if (isUpdate === 'true') {
            this.handleRefresh();
            return;
          } else if (!this.state.networkError) {
            result = this.state.dataSource.concat(result);
          }

          AsyncStorage.setItem('likedNews', JSON.stringify(result));
          this.setState({ dataSource: result });
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
        this.setState(prevState => ({
          page: prevState.page + 1,
          networkError: false
        }));
        return JSON.parse(res);
      }

      throw res;
    } catch (error) {
      const data = await AsyncStorage.getItem('likedNews');

      if (data) {
        this.setState({ networkError: true });
        return JSON.parse(data);
      }
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
    if (
      this.state.dataSource.length === 0 ||
      this.state.networkError === true
    ) {
      return (
        <View>
          <ActivityIndicator size="large" color="#aa3300" />
          <FlatList
            data={this.state.dataSource}
            refreshing={this.state.refreshing}
            renderItem={rowData => (
              <News rowData={rowData.item} navigation={this.props.navigation} />
            )}
            onEndReached={() => this.loadMore()}
            onRefresh={() => this.handleRefresh()}
            keyExtractor={item => item.id}
          />
        </View>
      );
    }

    return (
      <FlatList
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
