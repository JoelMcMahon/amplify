import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Video } from "expo-av";

export const displayMedia = (type, uri, bool) => {
  if (type === "photo") {
    return <Image style={styles.media} source={{ uri }} />;
  } else if (type === "video") {
    return (
      <Video
        style={styles.media}
        source={{ uri }}
        useNativeControls={bool ? false : true}
        isLooping
      />
    );
  } else {
    return <View></View>;
  }
};

const styles = StyleSheet.create({
  media: {
    height: 200,
    width: "100%",
    // marginTop: -11,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
