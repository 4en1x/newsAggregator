import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Text,
	Alert,
	ActivityIndicator
} from 'react-native';

import config from '../../../config.json';

export default class Register extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			nickname: "",
			repeatPassword: "",
			error: "",
			showProgress: false,
		}
	}

	onPressEmailHint = () => {
		Alert.alert(
			'Email hint',
			'Should be a valid GMail email address',
			[{text: 'Got It'}]
		)
	};

	onPressPasswordHint = () => {
		Alert.alert(
			'Password hint',
			'Should contain more then 6 simbols',
			[{text: 'Got It'}]
		)
	};

	onPressNicknameHint = () => {
		Alert.alert(
			'Nickname hint',
			'Should be unique',
			[{text: 'Got It'}]
		)
	};

	onPressPasswordRepeatHint = () => {
		Alert.alert(
			'Repeat Password hint',
			'Please repeat your password',
			[{text: 'Got It'}]
		)
	};

	async onRegisterPressed() {
		if(this.state.password !== this.state.repeatPassword) {
			Alert.alert(
				'Error',
				'Please check your password',
				[{text: '😱'}]
			);

			return null;
		}

		this.setState({showProgress: true})
		try {
			let response = await fetch(`${config.web.backendOrigin}/users/register`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
					nickname: this.state.nickname,
				})
			});
			let res = await response.text();

			if (response.status === 409) {
				Alert.alert(
					'Error',
					JSON.parse(res).error,
					[{text: 'OK'}]
				);

				this.setState({showProgress: false});
				return null;
			}

			if (response.status === 200) {
				Alert.alert(
					'Hello',
					JSON.parse(res).nickname,
					[{text: '😱'}]
				);
				this.setState({showProgress: false});
				this.props.navigation.navigate('Home')
			} else {
				Alert.alert(
					'Error',
					'Some error',
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
						onSubmitEditing={() => {this.nicknameInput.focus()}}
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
						placeholder='Nickname'
						placeholderTextColor='rgba(255, 255, 255, 0.7)'
						returnKeyType='next'
						onSubmitEditing={() => {this.passwordInput.focus()}}
						onChangeText={ (text)=> this.setState({nickname: text}) }
						ref={(input) => this.nicknameInput = input}
						keyboardType='email-address'
						autoCapitalize='none'
						autoCorrect={false}
					/>

					<TouchableOpacity
						style={styles.hintContainer}
						onPress={this.onPressNicknameHint}
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
						onSubmitEditing={() => {this.passwordRepeatInput.focus()}}
						onChangeText={ (text)=> this.setState({password: text}) }
					/>

					<TouchableOpacity
						style={styles.hintContainer}
						onPress={this.onPressPasswordHint}
					>
						<Text style={styles.buttonText}>❔</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder='Repeat password'
						placeholderTextColor='rgba(255, 255, 255, 0.7)'
						secureTextEntry
						returnKeyType='go'
						ref={(input) => this.passwordRepeatInput = input}
						onChangeText={ (text)=> this.setState({repeatPassword: text}) }
					/>

					<TouchableOpacity
						style={styles.hintContainer}
						onPress={this.onPressPasswordRepeatHint}
					>
						<Text style={styles.buttonText}>❔</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={this.onRegisterPressed.bind(this)}
				>
					<Text style={styles.buttonText}>REGISTER</Text>
				</TouchableOpacity>

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