import { Video } from "expo-av";
import React from "react";
import { Button, StyleSheet, View, Image, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

const ConfirmMedia = ({ navigation, media, setMedia }) => {
  const deleteMedia = () => {
    setMedia({ type: null, uri: null });
    navigation.navigate("Capture");
  };

  const confirmMedia = () => {
    navigation.navigate("Form");
  };

  const buttons = () => {
    return (
      <View style={styles.floatingButtons}>
        {/* <Button title="Confirm" onPress={confirmMedia} /> */}
        {/* <Button title="Delete" onPress={deleteMedia} /> */}
        <Pressable
          style={styles.pressableButtonPositive}
          onPress={confirmMedia}
        >
          <MaterialCommunityIcons
            name="sticker-check"
            size={45}
            color="green"
          />
        </Pressable>
        <Pressable style={styles.pressableButtonNegative} onPress={deleteMedia}>
          <Foundation name="page-delete" size={45} color="red" />
        </Pressable>
      </View>
    );
  };

  if (media.type === "photo") {
    return (
      <View>
        <Image style={styles.placeholder} source={{ uri: media.uri }} />
        {/* <Button title="Confirm" onPress={confirmMedia} />
        <Button title="Delete" onPress={deleteMedia} /> */}
        {buttons()}
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
      {buttons()}
    </View>
  );
};

export default ConfirmMedia;

const styles = StyleSheet.create({
  placeholder: {
    width: "100%",
    height: "100%",
  },
  floatingButtons: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    bottom: 40,
    zIndex: 200,
  },
  pressableButtonPositive: {
    borderColor: "green",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    width: 75,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },
  pressableButtonNegative: {
    borderColor: "red",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    width: 75,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },
});
