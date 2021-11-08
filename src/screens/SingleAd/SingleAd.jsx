import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { displayMedia } from "../../Hooks/displayMedia";

const SingleAd = ({ currentAd, navigation, onProfile }) => {
  const { title, body, displayName, created, url, type, userId } = currentAd;
  const back = () => {
    navigation.goBack();
  };

  const goToChat = () => {
    console.log(userId);
  };
  return (
    <View>
      {!onProfile && (
        <>
          <Text>{displayName}</Text>
          <Button title="Chat" onPress={goToChat}></Button>
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
