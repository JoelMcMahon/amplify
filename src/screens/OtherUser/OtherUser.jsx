import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useGetUser } from "./getUser";

const OtherUser = ({ userId, navigation }) => {
  const { loading, user } = useGetUser(userId);
  console.log("on other user");

  if (loading)
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );

  const { displayName, email, fullName } = user;

  return (
    <View>
      <Text>Full Name: {fullName}</Text>
      <Text>Display Name: {displayName}</Text>
      <Text>Email: {email}</Text>
    </View>
  );
};

export default OtherUser;

const styles = StyleSheet.create({});
