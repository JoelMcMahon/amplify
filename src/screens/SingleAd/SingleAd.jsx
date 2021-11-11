import React, { useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { displayMedia } from "../../Hooks/displayMedia";
import { Card, Title, Button, Paragraph } from "react-native-paper";
import { styles } from "./Styles";
import { Ionicons } from "@expo/vector-icons";
import createChatRoom from "../../utils/createChatRoom";
import getSingleChat from "../../utils/getSingleChat";
import { userAppAuth } from "../../Hooks/userAppAuth";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate } from "../../utils/date";

const SingleAd = ({
  currentAd,
  navigation,
  onProfile,
  setOtherUser,
  currentUser,
  chatArray,
}) => {
  const { title, body, displayName, created, url, type, userId } = currentAd;

  let date;

  if (created) {
    const { formattedDate } = formatDate(created);
    date = formattedDate;
  }

  const back = () => {
    if (onProfile) {
      navigation.navigate("ProfilePosts");
    } else {
      navigation.navigate("HomePosts");
    }
  };
  const { user } = userAppAuth();
  const goToChat = async () => {
    console.log(chatArray);
    const newRoomId = await createChatRoom(
      user.id,
      user.displayName,
      //^current user id and DN
      userId,
      displayName,
      //^ad posters id and DN
      chatArray
    );
    const messages = await getSingleChat(newRoomId, user.id);
    // console.log(newRoomId, "<newId");
    navigation.navigate("Inbox", {
      screen: "Chats",
      screen: "SingleChat",
      params: { roomId: newRoomId, messages },
    });
  };

  const goToUserProfile = () => {
    navigation.navigate("OtherUser");
  };

  useEffect(() => {
    if (!onProfile) {
      setOtherUser(userId);
    }
  }, []);

  const chatIcon = () => {
    return (
      <Pressable onPress={goToChat} style={styles.Pressable}>
        <Ionicons name="chatbox-ellipses-outline" size={40} color="white" />
      </Pressable>
    );
  };

  return (
    <LinearGradient colors={["#252525", "#181818"]}>
      <Card style={styles.individualPost}>
        {displayMedia(type, url)}
        <Card.Title title={title} subtitle={date} right={chatIcon} />
        <Card.Content>
          {!onProfile && (
            <>
              <Text style={styles.username}>{displayName}</Text>
              <Button title="Go To Profile" onPress={goToUserProfile}></Button>
            </>
          )}
          <Text style={styles.bodyText}>{body}</Text>
        </Card.Content>
        <Button onPress={back}>Back</Button>
      </Card>
    </LinearGradient>
  );
};

export default SingleAd;
