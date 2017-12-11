import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative'
  },

  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column'
  },

  downContainer: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  author: {
    marginTop: 20,
    marginBottom: -20,
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'left'
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center'
  },

  dateCreated: {
    marginTop: 20,
    marginBottom: -20,
    color: '#fff',
    fontSize: 18,
    textAlign: 'left'
  },

  image: {
    height: 400
  }
});
