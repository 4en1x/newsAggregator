import {StackNavigator,} from 'react-navigation';
import LogIn from './src/components/logIn/logIn'
import Register from './src/components/logIn/register'


export const Feed =StackNavigator({
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
});