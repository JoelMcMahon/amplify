import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const NewPost = () => {
  return (
    <>
      <Tab.Screen>Test</Tab.Screen>
    </>
  );
};

export default NewPost;
