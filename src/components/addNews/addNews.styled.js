import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'rgba(22, 160, 133, 0.7)'
  },

  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
    fontSize: 18
  },

  smallInput: {
    height: 40
  },

  largeInput: {
    height: 120
  },

  dateView: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },

  registrationButtonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    width: '49%'
  },

  registrationContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between'
  },

  dateHint: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  },

  dateContainer: {
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 10,
    paddingTop: 10
  },

  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 10
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  },

  loader: {
    marginVertical: 20
  }
});
