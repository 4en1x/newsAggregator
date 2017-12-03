import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
	KeyboardAvoidingView,
	Picker,
	Modal,
	TouchableOpacity
} from 'react-native';
import LoginForm from './loginForm';
import l10n from '../../localization';
import ChooseLanguageModal from '../Modal/chooseLanguageModal.component'

export default class LogIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lan: 'ru',
			isModalVisible: false,
		}
	}

	_showModal = () => this.setState({isModalVisible: true});

	handleLanguage = (langValue) => {
		this.setState({lan: langValue});
	};

	handleModalVisible = (event) => {
		this.setState({isModalVisible: event});
	};

	render (){
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<TouchableOpacity
					style={styles.settingsContainer}
					onPress={this._showModal.bind(this)}
				>
					<Text style={styles.settingsText}>
						{l10n("components.login.settingsLabel",this.state.lan)}
					</Text>
				</TouchableOpacity>

				<ChooseLanguageModal
					onSelectLanguage={this.handleLanguage}
					onClose={this.handleModalVisible}
					transparent={true}
					visible={this.state.isModalVisible}
					lan={this.state.lan}
				/>

				<View style={styles.logoContainer}>
					<Image
						style={styles.logo}
						source={require('../../images/octopus.png')}
					/>
					<Text style={styles.title}>
						{l10n("components.login.applicationName",this.state.lan)}
					</Text>
				</View>

				<View>
					<LoginForm navigation={this.props.navigation} lan={this.state.lan}/>
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

	settingsContainer: {
		alignItems: 'flex-end',
		marginRight: 10,
		marginTop: 10
	},

	settingsText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		opacity: 0.9
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
