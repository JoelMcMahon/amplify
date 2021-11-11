import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutbutton: {
    justifyContent: 'center',
    height: 40,
    marginTop: 30,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    // width: 90,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '110%',
  },
  profilecard: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    paddingTop: 20,
    paddingBottom:20,
    paddingLeft:30,
    paddingRight:30,
    borderRadius: 15,
    backgroundColor: '#181818',
    elevation: 10,
    overflow: 'hidden',
  },
  profiledetails: {
    marginLeft: 20,
    textAlign:'left',
  },
  username: {
    fontSize: 26,
  },
  city: {
    fontSize: 14,
  },
  shadow: {
    elevation: 10,
  },
});
