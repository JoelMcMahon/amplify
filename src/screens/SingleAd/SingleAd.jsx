import React, { useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { displayMedia } from "../../Hooks/displayMedia";
import { Card, Title, Button, Paragraph } from "react-native-paper";
import { styles } from "./Styles";
import { Ionicons } from "@expo/vector-icons";

const SingleAd = ({ currentAd, navigation, onProfile, setOtherUser }) => {
  const { title, body, displayName, created, url, type, userId } = currentAd;
  const back = () => {
    if (onProfile) {
      navigation.navigate("ProfilePosts");
    } else {
      navigation.navigate("HomePosts");
    }
  };

  console.log(setOtherUser);

  const goToChat = () => {
    console.log("goToChat", `User ID: ${userId}`);
    // navigation.navigate("chat-page")
  };

  const goToUserProfile = () => {
    navigation.navigate("OtherUser");
  };

  useEffect(() => {
    if (!onProfile) {
      setOtherUser(userId);
    }
  }, []);

  return (
    <Card style={styles.individualPost}>
      {displayMedia(type, url)}
      <Card.Title title={title} />
      <Card.Content>
        {!onProfile && (
          <>
            <Text style={styles.username}>{displayName}</Text>
            <Button title="Go To Profile" onPress={goToUserProfile}></Button>
          </>
        )}
        <Text style={styles.bodyText}>{body}</Text>
        <Pressable onPress={goToChat} style={styles.Pressable}>
          <Ionicons name="chatbox-ellipses-outline" size={40} color="#363636" />
        </Pressable>
      </Card.Content>
      <Button onPress={back}>Back</Button>
    </Card>
  );
};

export default SingleAd;
