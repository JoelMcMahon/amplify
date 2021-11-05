import { Video } from "expo-av";
import React from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";

const ConfirmMedia = ({ navigation, media, setMedia }) => {
  console.log(media.type);

  const deleteMedia = () => {
    setMedia({ type: null, uri: null });
    navigation.navigate("Capture");
  };

  const confirmMedia = () => {
    console.log(media);
    navigation.navigate("Form");
  };

  console.log(media.uri);

  if (media.type === "photo") {
    return (
      <View>
        <Image style={styles.placeholder} source={{ uri: media.uri }} />
        <Button title="Confirm" onPress={confirmMedia} />
        <Button title="Delete" onPress={deleteMedia} />
      </View>
    );
  }

  return (
    <View>
      <Video
        style={styles.placeholder}
        source={{ uri: media.uri }}
        useNativeControls
        isLooping
      />
      <View style={styles.floatingButtons}>
        <Button title="Confirm" onPress={confirmMedia} />
        <Button title="Delete" onPress={deleteMedia} />
      </View>
    </View>
  );
};

export default ConfirmMedia;

const styles = StyleSheet.create({
  placeholder: {
    width: "100%",
    height: "80%",
  },
  floatingButtons: {
    position: "absolute",
  },
});
