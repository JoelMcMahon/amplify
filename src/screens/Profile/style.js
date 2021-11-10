import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    justifyContent: 'center',
    height: 40,
    marginTop: 50,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 10,
    width: 150,
  },
  logoutbutton: {
    justifyContent: 'center',
    height: 40,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    width: 150,
  },

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },

  gradientbutton: {
    height: '100%',
  },
  profilecard: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "flex-start",
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
  },
  profiledetails: {
    marginLeft: 20,
    alignItems: 'center',
  },
  username: {
    fontSize: 26,
  },
  city: {
    fontSize: 16,
  },

  shadow: {
    elevation: 10,
  },
});
