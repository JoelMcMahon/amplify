import React from "react";
import { Pressable, Text, View } from "react-native";
import { logoutHandler } from "../../utils/dbInteraction";
import style from "./style";

const Profile = ({ user: { fullName, email }, setUser }) => {
  return (
    <View style={style.container}>
      <Text>User: {fullName}</Text>
      <Text>Email: {email}</Text>

      <Pressable
        onPress={() => {
          logoutHandler(setUser);
        }}
        style={style.logout}
      >
        <Text style={style.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Profile;
