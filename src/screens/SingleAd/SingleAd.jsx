import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { displayMedia } from "../../Hooks/displayMedia";

const SingleAd = ({ currentAd, navigation, onProfile, setOtherUser }) => {
  const { title, body, displayName, created, url, type, userId } = currentAd;
  const back = () => {
    navigation.goBack();
  };

  const goToChat = () => {
    console.log("goToChat", `User ID: ${userId}`);
    // navigation.navigate("chat-page")
  };

  const goToUserProfile = () => {
    navigation.navigate("OtherUser");
  };

  useEffect(() => {
    setOtherUser(userId);
  }, []);

  return (
    <View>
      {!onProfile && (
        <>
          <Text>{displayName}</Text>
          <Button title="Chat" onPress={goToChat}></Button>
          <Button title="Go To Profile" onPress={goToUserProfile}></Button>
        </>
      )}
      {displayMedia(type, url)}
      <Text>{title}</Text>
      <Text>{body}</Text>
      <Button title="Back" onPress={back}></Button>
    </View>
  );
};

export default SingleAd;

const styles = StyleSheet.create({});
