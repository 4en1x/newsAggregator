import React, { Component } from 'react';
import {
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  View,
  Text
} from 'react-native';
import Search from 'react-native-search-box';

import News from '../../components/news/news.component';
import config from '@/config/config.json';
import styles from './news.styled';
import l10n from '@/helpers/localization';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      page: 1,
      refreshing: false,
      query: '',
      lan: 'en'
    };

    this.loadAll(this.state.page);
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
        this.setState(prevState => ({ page: prevState.page + 1 }));
        return JSON.parse(res);
      }

      throw res;
    } catch (error) {
      this.setState({ error });
      console.log(`error ${error}`);
    }

    return null;
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
          <Text>{l10n('components.news.searchError', this.state.lan)}</Text>
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
