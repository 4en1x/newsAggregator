import React, { Component } from 'react';
import {
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  View,
  Text
} from 'react-native';
import Search from 'react-native-search-box';

import News from '../news/news.component';
import config from '../../../config.json';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      page: 1,
      refreshing: false,
      query: ''
    };

    this.loadAll(this.state.page);
  }

  componentDidMount() {
    AsyncStorage.getItem('language')
      .then(value => {
        this.setState({ lan: value });
      })
      .done();
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
      console.log(this.state.page);
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
      const query = this.state.query ? `&title=${this.state.query}` : '';
      const response = await fetch(
        `${config.web.backendOrigin}/articles?page=${page}${query}`,
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
  }

  _handleRefresh() {
    this.setState(
      {
        refreshing: true,
        page: 1,
        query: ''
      },
      () => this.loadAll(1)
    );
  }

  _handleSearch(text) {
    this.setState(
      {
        refreshing: true,
        page: 1,
        query: text
      },
      () => this.loadAll(1)
    );
  }

  render() {
    if (this.state.dataSource.length === 0 && this.state.query === '') {
      return <ActivityIndicator size="large" color="#aa3300" />;
    }

    if (this.state.dataSource.length === 0 && this.state.query !== '') {
      return (
        <View>
          <Search
            backgroundColor="rgba(0, 0, 0, 0.1)"
            onSearch={text => this._handleSearch(text)}
            ref="search_box"
          />
          <Text>Try other search query</Text>
        </View>
      );
    }

    return (
      <View>
        <Search
          backgroundColor="rgba(0, 0, 0, 0.1)"
          onSearch={text => this._handleSearch(text)}
          ref="search_box"
        />
        <FlatList
          data={this.state.dataSource}
          refreshing={this.state.refreshing}
          renderItem={rowData => (
            <News rowData={rowData.item} navigation={this.props.navigation} />
          )}
          onEndReached={() => this.loadMore()}
          onRefresh={() => this._handleRefresh()}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
