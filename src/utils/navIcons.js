import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export const navIcons = ({ route }) => ({
  tabBarIcon: ({ focused, size, color }) => {
    if (route.name === "Home") {
      return <FontAwesome name="map-o" size={24} color="#FEF4EC" />;
    }

    if (route.name === "Profile") {
      return <Feather name="user" size={24} color="#FEF4EC" />;
    }

    if (route.name === "NewPost") {
      return <MaterialIcons name="post-add" size={24} color="#FEF4EC" />;
    }

    if (route.name === "Inbox") {
      return (
        <Ionicons name="chatbox-ellipses-outline" size={24} color="#FEF4EC" />
      );
    }
  },
  tabBarStyle: {
    backgroundColor: `#363636`,
    borderTopWidth: 0,
  },
  headerStyle: {
    backgroundColor: "#363636",
    borderBottomWidth: 0,
  },
  headerTintColor: "#FEF4EC",
});
