import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    // textAlign: "center",
    color: 'white',
  },
  background: {
    backgroundColor: '#181818',
  },
  searchBar: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: '#404040',
    borderRadius: 5,
    width: '80%',
    margin: 8,
    alignSelf: 'center',
  },
  userCard: { backgroundColor: '#272c30' },
  avatar: {
    marginRight: 20,
  },
  chatcontainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  searchtitle: {
    marginRight: 30,
  },
  divider: {
    marginTop: 15,
    marginBottom: -15,
  },
});
export default styles;
