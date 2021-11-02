import React, { useState } from "react";
import { Button, View, Pressable, Text } from "react-native";
import { TakePicture } from "./capture/picture";
import { TakeVideo } from "./capture/video";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";

const NewPost = () => {
  const [toggleCapture, setToggleCapture] = useState(true);

  const toggle = () => {
    setToggleCapture(!toggleCapture);
  };

  return (
    <View style={styles.container}>
      <View style={styles.capture}>
        {toggleCapture ? TakePicture() : TakeVideo()}
      </View>
      <View style={styles.toggleButton}>
        <Pressable style={styles.pressArea} onPress={toggle}>
          <Text style={styles.buttonColour}>
            {toggleCapture ? "Photo" : "Video"}
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={({ pressed }) => {
          return [
            { borderColor: pressed ? "black" : "#2d6a4f", color: "red" },
            styles.captureButton,
          ];
        }}
      >
        {toggleCapture ? (
          <Feather name="video" size={24} color="#2d6a4f" style={styles.icon} />
        ) : (
          <Feather
            name="camera"
            size={24}
            color="#2d6a4f"
            style={styles.icon}
          />
        )}
      </Pressable>
    </View>
  );
};

export default NewPost;
