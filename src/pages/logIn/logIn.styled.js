import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  }
});
