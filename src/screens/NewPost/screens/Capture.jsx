import { Camera } from "expo-camera";
import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useCamera } from "../hooks/camera";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Capture = ({ navigation, setMedia }) => {
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const { type, toggleType, mediaType, toggleCameraMode, hasPermission } =
    useCamera();

  if (!hasPermission) {
    return (
      <View>
        <Text>No Camera permissions</Text>
      </View>
    );
  }

  const takePhoto = async () => {
    if (camera) {
      setLoading(true);
      const { uri } = await camera.takePictureAsync(null);
      setLoading(false);
      setMedia({ type: "photo", uri });
      navigation.navigate("ConfirmMedia");
    } else {
      console.warn("Error with camera reference");
    }
  };

  const takeVideo = async () => {
    if (!isRecording) {
      setIsRecording(true);
      const { uri } = await camera.recordAsync();
      setMedia({ type: "video", uri });
      navigation.navigate("ConfirmMedia");
    } else {
      setIsRecording(false);
      camera.stopRecording();
    }
  };

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        mediaType === "photo"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setMedia({ type: mediaType, uri: result.uri });
      navigation.navigate("ConfirmMedia");
    }
  };

  const buttons = () => {
    return (
      <View style={styles.buttons}>
        {mediaType === "photo" ? (
          <Pressable onPress={takePhoto} style={styles.takeMedia}>
            {loading ? (
              <Fontisto name="spinner-refresh" size={24} color="white" />
            ) : (
              <FontAwesome5 name="camera-retro" size={24} color="white" />
            )}
          </Pressable>
        ) : (
          <Pressable onPress={takeVideo} style={styles.takeMedia}>
            {isRecording ? (
              <AntDesign name="videocamera" size={24} color="red" />
            ) : (
              <AntDesign name="videocamera" size={24} color="white" />
            )}
          </Pressable>
        )}

        <View style={styles.buttonOptions}>
          <Pressable onPress={pickMedia}>
            <MaterialIcons name="add-photo-alternate" size={32} color="black" />
          </Pressable>
          <Pressable onPress={toggleType}>
            <Ionicons name="camera-reverse-sharp" size={32} color="black" />
          </Pressable>
          <Pressable onPress={toggleCameraMode}>
            {mediaType === "photo" ? (
              <FontAwesome5 name="camera-retro" size={32} color="black" />
            ) : (
              <AntDesign name="videocamera" size={32} color="black" />
            )}
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Form")}>
            <AntDesign name="back" size={32} color="black" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Camera
        style={styles.cameraContainer}
        type={type}
        ref={(ref) => {
          setCamera(ref);
        }}
      />
      {buttons()}
    </View>
  );
};

export default Capture;

const styles = StyleSheet.create({
  cameraContainer: {
    aspectRatio: 1,
    height: "100%",
    width: "100%",
  },
  buttons: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
  },
  record: {
    width: "100%",
    backgroundColor: "gray",
    height: 50,
  },
  takeMedia: {
    position: "absolute",
    bottom: 75,
    left: "45%",
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleMode: {
    position: "absolute",
    top: 0,
    backgroundColor: "black",
    padding: 5,
  },
  whiteText: {
    color: "white",
  },
  gallery: {
    position: "absolute",
    bottom: 100,
  },
  buttonOptions: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#e05c10",
    justifyContent: "space-around",
    paddingBottom: 5,
    paddingTop: 5,
  },
});
