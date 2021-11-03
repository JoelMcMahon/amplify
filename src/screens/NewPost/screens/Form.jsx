import { Video } from "expo-av";
import React, { useState } from "react";
import { Image } from "react-native";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { mediaThumbnail } from "../utils";

const Form = ({ navigation, media }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigateToCapture = () => {
    navigation.navigate("Capture");
  };

  const confirmAd = () => {
    console.log("confirming ad");
  };

  return (
    <View>
      <View style={styles.mediaPlaceholder}>{mediaThumbnail(media)}</View>
      <Button
        onPress={navigateToCapture}
        title={media.uri ? "Change Photo/Video" : "Add Photo/Video"}
      />
      <TextInput
        placeholder="Title.."
        onChangeText={(value) => setTitle(value)}
      />
      <TextInput
        placeholder="Tell us more.."
        onChangeText={(value) => setBody(value)}
      />
      <Button
        onPress={confirmAd}
        title={media.uri ? "Change Photo/Video" : "Add Photo/Video"}
      />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  mediaPlaceholder: {
    height: "60%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
