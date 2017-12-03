import { TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';

import Home from './home'
import LikedNews from './likedNews'
import Info from './info'

class NewsScreen extends React.Component {
	static navigationOptions = {
		tabBarLabel: 'News',
		tabBarIcon: ({ tintColor }) => (
			<Image
				source={require('../../images/home.png')}
				style={[styles.icon, {tintColor: tintColor}]}
			/>
		),
	};

	render() {
		return <Home navigation = {this.props.navigation}/>
	}
}

class LikedNewsScreen extends React.Component {
	static navigationOptions = {
		tabBarLabel: 'Liked News',
		tabBarIcon: ({ tintColor }) => (
			<Image
				source={require('../../images/love.png')}
				style={[styles.icon, {tintColor: tintColor}]}
			/>
		),
	};

	render() {
		return <LikedNews navigation = {this.props.navigation}/>
	}
}

class InfoScreen extends React.Component {
	static navigationOptions = {
		tabBarLabel: 'Info',
		tabBarIcon: ({ tintColor }) => (
			<Image
				source={require('../../images/info.png')}
				style={[styles.icon, {tintColor: tintColor}]}
			/>
		),
	};

	render() {
		return <Info navigation = {this.props.navigation}/>
	}
}

export const HomeNav = TabNavigator({
	Home: {
		screen: NewsScreen,
	},
	LikedNews: {
		screen: LikedNewsScreen,
	},
	Info: {
		screen: InfoScreen,
	},
},
	{
		animationEnabled: true,
		tabBarOptions: {
			activeTintColor: '#e91e63',
		},
	}
	);




const styles = StyleSheet.create({
	icon: {
		width: 26,
		height: 26,
	},
});

// export class HomeNav extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {currentScreen: null}
// 	}
//
// 	_onNavigationStateChange(prevState, newState, action) {
// 		// const currentScreen = getCurrentRouteName(currentState)
// 		// const prevScreen = getCurrentRouteName(prevState)
// 		// console.debug('onNavigationStateChange currentScreen=', currentScreen,
// 		//   'prevScreen=', prevScreen, 'action.routeName=', action.routeName)
// 		console.debug('onNavigationStateChange action.routeName=', action.routeName)
// 		console.log(prevState)
// 		console.log(this.props)
// 		this.setState({currentScreen: action.routeName})
// 	}
// 	render (){
// 		return (
// 			<Nav
// 				onNavigationStateChange={this._onNavigationStateChange.bind(this)}
//
// 			/>
// 		);
// 	}
// }
