import React from "react";
import { Image, View, Text } from "react-native";

export const mediaThumbnail = (media) => {
  if (media.type === "photo") {
    return <Image source={{ uri: media.uri }} />;
  }
  if (media.type === "video") {
    return <Video source={{ uri: media.uri }} />;
  }

  return (
    <View>
      <Text>No Media</Text>
    </View>
  );
};
