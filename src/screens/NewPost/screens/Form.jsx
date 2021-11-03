import { Video } from "expo-av";
import React, { useState } from "react";
import { Image } from "react-native";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";

const Form = ({ navigation }) => {
  const [media, setMedia] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigateToCapture = () => {
    navigation.navigate("Capture");
  };

  const mediaThumbnail = () => {
    if (media.type === "photo") {
      return <Image source={{ uri: media }} />;
    }

    if (media.type === "video") {
      return <Video source={{ uri: media }} />;
    }
  };

  return (
    <View>
      <Button
        onPress={navigateToCapture}
        title={media ? "Change Photo/Video" : "Add Photo/Video"}
      />
      <TextInput
        placeholder="Title.."
        onChangeText={(value) => setTitle(value)}
      />
      <TextInput
        placeholder="Tell us more.."
        onChangeText={(value) => setBody(value)}
      />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({});
