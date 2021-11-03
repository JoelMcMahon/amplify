import { Video } from "expo-av";
import React, { useState } from "react";
import { Image } from "react-native";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { uploadAd } from "../dbInteraction";

const Form = ({ navigation, media }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [uploadingAd, setUploadingAd] = useState(false);

  const navigateToCapture = () => {
    navigation.navigate("Capture");
  };

  const mediaPlaceholder = () => {
    if (media.type === "photo") {
      return (
        <Image source={{ uri: media.uri }} style={styles.mediaPlaceholder} />
      );
    } else if (media.type === "video") {
      return (
        <Video
          source={{ uri: media.uri }}
          style={styles.mediaPlaceholder}
          useNativeControls
          isLooping
        />
      );
    } else {
      return (
        <View style={styles.mediaPlaceholder}>
          <Text>No Media</Text>
        </View>
      );
    }
  };

  return (
    <View>
      {mediaPlaceholder()}
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
        onPress={() => {
          uploadAd(setUploadingAd, title, body, media);
        }}
        title={uploadingAd ? "Uploading.." : "Upload Ad"}
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
