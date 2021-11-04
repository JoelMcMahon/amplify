import React from "react";
import { Pressable, Text, View } from "react-native";
import { logoutHandler } from "../../utils/dbInteraction";
import style from "./style";

const Profile = ({ user, setUser }) => {
  const { fullName, displayName, id, email } = user;
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
      <Pressable
        onPress={() => {
          console.log(user);
        }}
        style={style.logout}
      >
        <Text style={style.buttonText}>Check</Text>
      </Pressable>
    </View>
  );
};

export default Profile;
