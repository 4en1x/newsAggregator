import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Text,
	AlertIOS
} from 'react-native';

export default class loginForm extends Component {
	constructor(props) {
		super(props);
	}

	render (){
		const onPressEmailHint = () => {
			AlertIOS.alert(
				'Email hint',
				'Should be a valid GMail email address',
				[{text: 'Got It'}]
			)
		};

		const onPressPasswordHint = () => {
			AlertIOS.alert(
				'Password hint',
				'Should contain more then 6 simbols',
				[{text: 'Got It'}]
			)
		};

		const onPressRegisterButton = () => {
			this.props.navigation.navigate('Register')
		};

		const onPressForgotButton = () => {
			AlertIOS.alert(
				'Ha-Ha',
				'I\'m sorry, but there\'s nothing to be done',
				[{text: '😱'}]
			)
		};

		return (
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder='User Email'
						placeholderTextColor='rgba(255, 255, 255, 0.7)'
						returnKeyType='next'
						onSubmitEditing={() => {
							this.passwordInput.focus()
						}}
						keyboardType='email-address'
						autoCapitalize='none'
						autoCorrect={false}
					/>

					<TouchableOpacity
						style={styles.hintContainer}
						onPress={onPressEmailHint}
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
					/>

					<TouchableOpacity
						style={styles.hintContainer}
						onPress={onPressPasswordHint}
					>
						<Text style={styles.buttonText}>❔</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={styles.buttonContainer}>
					<Text style={styles.buttonText}>LOGIN</Text>
				</TouchableOpacity>

				<View style={styles.registrationContainer}>
					<TouchableOpacity
						style={styles.registrationButtonContainer}
						onPress={onPressRegisterButton}
					>
						<Text style={styles.buttonText}>Register</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.registrationButtonContainer}
						onPress={onPressForgotButton}
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
	}
});