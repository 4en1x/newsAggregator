import { StackNavigator } from 'react-navigation';
import LogIn from './src/components/logIn/logIn'
import Register from './src/components/register/register'
import Home from './src/components/home/home'

export const Feed = StackNavigator({
	LogIn: {
		screen: LogIn,
		navigationOptions: {
			title: 'LogIn Screen',
		}
	},
	Register: {
		screen: Register,
		navigationOptions: {
			title: 'Register Screen',
		}
	},
	Home: {
		screen: Home,
		navigationOptions: {
			title: 'Home Page',
			headerLeft: null,
		}
	},
});