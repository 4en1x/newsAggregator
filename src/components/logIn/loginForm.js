import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Text,
	AlertIOS,
	ActivityIndicator
} from 'react-native';

import config from '../../../config.json';

class loginForm extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			error: "",
			showProgress: false,
		}
	}

	onPressEmailHint = () => {
		AlertIOS.alert(
			'Email hint',
			'Should be a valid GMail email address',
			[{text: 'Got It'}]
		)
	};

	onPressPasswordHint = () => {
		AlertIOS.alert(
			'Password hint',
			'Should contain more then 6 simbols',
			[{text: 'Got It'}]
		)
	};

	onPressRegisterButton = () => {
		this.props.navigation.navigate('Register')
	};

	onPressForgotButton = () => {
		AlertIOS.alert(
			'Ha-Ha',
			'I\'m sorry, but there\'s nothing to be done',
			[{text: '😱'}]
		)
	};

	async onLoginPressed() {
		this.setState({showProgress: true})
		try {
			let response = await fetch(`${config.web.backendOrigin}/users/login`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
				})
			});
			let res = await response.text();
			if (response.status === 200) {
				AlertIOS.alert(
					'Hello',
					JSON.parse(res).nickname,
					[{text: '😱'}]
				);
				this.setState({showProgress: false});
				this.props.navigation.navigate('Home')
			} else {
				AlertIOS.alert(
					'Error',
					'Invalid Email or Password',
					[{text: '😱'}]
				);
				throw res;
			}
		} catch(error) {
			this.setState({error: error});
			console.log("error " + error);
			this.setState({showProgress: false});
		}
	}

	render (){
		return (
			<View style={styles.container}>
				<ActivityIndicator
					animating={this.state.showProgress}
					size="large"
					color="#aa3300"
					style={styles.loader}
				/>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder='User Email'
						placeholderTextColor='rgba(255, 255, 255, 0.7)'
						returnKeyType='next'
						onSubmitEditing={() => {
							this.passwordInput.focus()
						}}
						onChangeText={ (text)=> this.setState({email: text}) }
						keyboardType='email-address'
						autoCapitalize='none'
						autoCorrect={false}
					/>

					<TouchableOpacity
						style={styles.hintContainer}
						onPress={this.onPressEmailHint}
					>
						<Text style={styles.buttonText}>❔</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder='Password'
						placeholderTextColor='rgba(255, 255, 255, 0.7)'
						secureTextEntry
						returnKeyType='go'
						ref={(input) => this.passwordInput = input}
						onChangeText={ (text)=> this.setState({password: text}) }
					/>

					<TouchableOpacity
						style={styles.hintContainer}
						onPress={this.onPressPasswordHint}
					>
						<Text style={styles.buttonText}>❔</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={this.onLoginPressed.bind(this)}
				>
					<Text style={styles.buttonText}>LOGIN</Text>
				</TouchableOpacity>

				<View style={styles.registrationContainer}>
					<TouchableOpacity
						style={styles.registrationButtonContainer}
						onPress={this.onPressRegisterButton}
					>
						<Text style={styles.buttonText}>Register</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.registrationButtonContainer}
						onPress={this.onPressForgotButton}
					>
						<Text style={styles.buttonText}>Forgot Password?</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},

	input: {
		height: 40,
		width: '90%',
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		marginBottom: 10,
		color: '#FFF',
		paddingHorizontal: 10,
	},

	inputContainer: {
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		flexDirection:'row',
	},

	registrationButtonContainer: {
		backgroundColor: '#2980b9',
		paddingVertical: 10,
		width: '49%',
	},

	registrationContainer: {
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		flexDirection:'row',
		paddingTop: 10,
		justifyContent: 'space-between',
	},

	hintContainer: {
		width: '10%',
		height: 40,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		marginBottom: 10,
		paddingTop: 10,
	},

	buttonContainer: {
		backgroundColor: '#2980b9',
		paddingVertical: 10,
	},

	buttonText: {
		textAlign: 'center',
		color: '#FFF',
		fontWeight: '700',
	},

	loader: {
		marginVertical: 20,
	}
});

export default loginForm;
