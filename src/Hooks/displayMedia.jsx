import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Video } from "expo-av";

export const displayMedia = (type, uri) => {
  if (type === "photo") {
    return <Image style={styles.media} source={{ uri }} />;
  } else if (type === "video") {
    return (
      <Video
        style={styles.media}
        source={{ uri }}
        useNativeControls
        isLooping
      />
    );
  } else {
    return (
      <View style={styles.media}>
        <Text>No Media</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  media: {
    height: 200,
    width: 200,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
