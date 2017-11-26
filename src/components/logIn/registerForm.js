import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Text,
	AlertIOS
} from 'react-native';

export default class Register extends Component {
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

		const onPressNicknameHint = () => {
			AlertIOS.alert(
				'Nickname hint',
				'Should be unique',
				[{text: 'Got It'}]
			)
		};

		const onPressPasswordRepeatHint = () => {
			AlertIOS.alert(
				'Repeat Password hint',
				'Please repeat your password',
				[{text: 'Got It'}]
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
						onSubmitEditing={() => {this.nicknameInput.focus()}}
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
						placeholder='Nickname'
						placeholderTextColor='rgba(255, 255, 255, 0.7)'
						returnKeyType='next'
						onSubmitEditing={() => {this.passwordInput.focus()}}
						ref={(input) => this.nicknameInput = input}
						keyboardType='email-address'
						autoCapitalize='none'
						autoCorrect={false}
					/>

					<TouchableOpacity
						style={styles.hintContainer}
						onPress={onPressNicknameHint}
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
					/>

					<TouchableOpacity
						style={styles.hintContainer}
						onPress={onPressPasswordHint}
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
					/>

					<TouchableOpacity
						style={styles.hintContainer}
						onPress={onPressPasswordRepeatHint}
					>
						<Text style={styles.buttonText}>❔</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={styles.buttonContainer}>
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
	}
});