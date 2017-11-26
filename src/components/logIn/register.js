import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Text,
	KeyboardAvoidingView,
	Image
} from 'react-native';
import RegisterForm from './registerForm';

export default class LogIn extends Component {
	render (){
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<View style={styles.logoContainer}>
					<Image
						style={styles.logo}
						source={require('../../images/cthulhu.png')}
					/>
					<Text style={styles.title}>Create New Account</Text>
				</View>

				<View>
					<RegisterForm/>
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
