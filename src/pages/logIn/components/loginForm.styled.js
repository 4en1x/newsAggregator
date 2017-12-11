import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20
  },

  input: {
    height: 40,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },

  inputContainer: {
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

  hintContainer: {
    width: '10%',
    height: 40,
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
