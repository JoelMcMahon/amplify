import React, { useState } from "react";
import { View, Text } from "react-native";
import SingleChat from "../SingleChat/SingleChat";
import Chats from "../Chats/Chats";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function InboxScreen({
  chatArray,
  usersArray,
  user,
  messagesObject,
}) {
  const Stack = createStackNavigator();
  // console.log(user, "<<<in inbox");

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Chats">
        {(props) => (
          <Chats
            {...props}
            chatArray={chatArray}
            usersArray={usersArray}
            currUser={user}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="SingleChat">
        {(props) => <SingleChat {...props} messagesObject={messagesObject} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
