import React, { Component } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View  } from 'react-native';

import News from '../news/news.component';
import config from '../../../config.json';


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
				alert("Rejected: " + error.message)
			})
	}

	async loadMore() {
		try {
			this.lodeNews(this.state.page).then(
				result => {
					result = this.state.dataSource.concat(result)
					this.setState(function(prevState, props){
						return {
							dataSource: result
						}
					});
				},
				error => alert("Rejected: " + error.message))
		} catch(error) {
			this.setState({error: error});
			console.log("error " + error);
		}

	}
	async lodeNews(page) {
		try {
			let response = await fetch(`${config.web.backendOrigin}/articles/liked/${page}`, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			});
			let res = await response.text();

			if (response.status === 200) {
				this.setState(function(prevState, props){
					return {page: prevState.page+1}
				});

				return JSON.parse(res);
			} else {
				throw res;
			}
		} catch(error) {
			this.setState({error: error});
			console.log("error " + error);
		}
	}

	handleRefresh = () => {
		this.setState({
			refreshing: true
		}, () => this.loadAll(1))
	};

	render() {
		if (this.state.dataSource.length === 0) {
			return <View>
				<ActivityIndicator
					size="large"
					color="#aa3300"
					style={styles.loader}
				/>
				<FlatList
					style={styles.container}
					data={this.state.dataSource}
					refreshing={this.state.refreshing}
					renderItem={(rowData) =>
						<News
							rowData={rowData.item}
							navigation={this.props.navigation}>
						</News>
					}
					onEndReached={() => this.loadMore()}
					onRefresh={() => this.handleRefresh()}
				/>
			</View>

		}

		return (
			<FlatList
				style={styles.container}
				data={this.state.dataSource}
				refreshing={this.state.refreshing}
				renderItem={(rowData) =>
					<News
						rowData={rowData.item}
						navigation={this.props.navigation}>
					</News>
				}
				onEndReached={() => this.loadMore()}
				onRefresh={() => this.handleRefresh()}
			/>
		);

	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});