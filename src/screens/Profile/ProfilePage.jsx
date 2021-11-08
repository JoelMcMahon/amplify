import React from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { logoutHandler } from "../../utils/dbInteraction";
import style from "./style";

const ProfilePage = ({ user, setUser, navigation }) => {
  const { fullName, displayName, email } = user;
  const postNavigator = () => {
    navigation.navigate("ProfilePosts");
  };
  return (
    <View style={style.container}>
      <Text>User: {fullName}</Text>
      <Text>Display Name: {displayName}</Text>
      <Text>Email: {email}</Text>

      <Pressable
        onPress={() => {
          logoutHandler(setUser);
        }}
        style={style.logout}
      >
        <Text style={style.buttonText}>Logout</Text>
      </Pressable>
      <Pressable onPress={postNavigator} style={style.logout}>
        <Text style={style.buttonText}>Posts</Text>
      </Pressable>
    </View>
  );
};

export default ProfilePage;
