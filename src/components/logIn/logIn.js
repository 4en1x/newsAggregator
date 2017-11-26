import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
	KeyboardAvoidingView
} from 'react-native';
import LoginForm from './loginForm';

export default class LogIn extends Component {
	render (){
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<View style={styles.logoContainer}>
					<Image
						style={styles.logo}
						source={require('../../images/octopus.png')}
					/>
					<Text style={styles.title}>News Aggregator</Text>
				</View>

				<View>
					<LoginForm navigation={this.props.navigation}/>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3498db'
	},

	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},

	logo: {
		height: 200,
		width: 200
	},

	title: {
		color: 'white',
		fontSize: 35,
		fontWeight: 'bold',
		opacity: 0.9
	},
});
