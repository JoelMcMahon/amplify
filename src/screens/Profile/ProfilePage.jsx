import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { logoutHandler } from "../../utils/dbInteraction";
import style from "./style";
import { Button, Text, Avatar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-elements";

const ProfilePage = ({ user, setUser, navigation, setIsLoggedIn }) => {
  const { fullName, displayName, email } = user;
  const postNavigator = () => {
    navigation.navigate("ProfilePosts");
  };

  return (
    <View style={style.container}>
      <LinearGradient
        colors={["#252525", "#181818"]}
        style={style.background}
      />
      <View style={style.profilecard}>
        {/* <Avatar.Image
          style={style.shadow}
          size={120}
          // source={require('../../../assets/pexels-cottonbro-6503569.jpg')}
        /> */}
        <View style={style.profiledetails}>
          <Text style={style.username}> {displayName}</Text>
          <Text> City </Text>

          <Button
            style={(style.logoutbutton, style.shadow)}
            theme={{ colors: { primary: "#252525" } }}
            mode="contained"
            onPress={() => {
              logoutHandler(setUser, setIsLoggedIn);
            }}
          >
            Logout
          </Button>
        </View>
      </View>
      <Button
        style={(style.button, style.shadow)}
        mode="contained"
        onPress={postNavigator}
      >
        Posts
      </Button>
    </View>
  );
};

export default withTheme(ProfilePage);
