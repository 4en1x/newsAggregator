import React, { Component } from 'react';
import { WebView, StyleSheet } from 'react-native';

export default class SingleNews extends Component {
	constructor(props) {
		super(props);

		console.log(this.props)
	}

	render (){
		return (
			<WebView
				source={{uri: this.props.news.url}}
				style={styles.container}
			/>
        );
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});