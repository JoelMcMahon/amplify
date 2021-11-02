import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import firebase from "firebase";
import { userAppAuth } from "../../hooks/userAppAuth";

const Profile = ({ setUser }) => {
  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        console.log(res);

        setUser(null);
      })
      .catch((err) => console.dir(err));
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button
        title="Log Out"
        onPress={() => {
          logoutHandler();
        }}
      />
    </View>
  );
};

export default Profile;
