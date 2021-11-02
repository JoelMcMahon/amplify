import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

export const navIcons = ({ route }) => ({
  tabBarIcon: ({ focused, size, color }) => {
    if (route.name === "Home") {
      return <Ionicons name="home-outline" size={24} color="black" />;
    } else if (route.name === "Profile") {
      return <Feather name="user" size={24} color="black" />;
    } else if (route.name === "NewPost") {
      return <MaterialIcons name="post-add" size={24} color="black" />;
    } else if (route.name === "Chats") {
      return (
        <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
      );
    }
  },
});
