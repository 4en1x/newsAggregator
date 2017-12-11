import { TabNavigator } from 'react-navigation';

import NewsScreen from './screens/newsScreen/newsScreen.component';
import LikedNewsScreen from './screens/likedNewsScreen/likedNewsScreen.component';
import InfoScreen from './screens/infoScreen/infoScreen.component';
import AddNewsScreen from './screens/addNewsScreen/addNewsScreen.component';

const HomeNav = TabNavigator(
  {
    Home: {
      screen: NewsScreen
    },
    LikedNews: {
      screen: LikedNewsScreen
    },
    Info: {
      screen: InfoScreen
    },
    AddNews: {
      screen: AddNewsScreen
    }
  },
  {
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63'
    }
  }
);

export default HomeNav;
