import { Camera } from "expo-camera";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { StyleSheet, Text, View, Button } from "react-native";
import { useCamera } from "../hooks/camera";

const Capture = ({ navigation, setMedia }) => {
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const { type, toggleType, mediaType, toggleCameraMode, hasPermission } =
    useCamera();

  const takePhoto = async () => {
    if (camera) {
      setLoading(true);
      const { uri } = await camera.takePictureAsync(null);
      setLoading(false);
      setMedia({ type: "photo", uri });
      navigation.navigate("ConfirmMedia");
    } else {
      console.log("Error with camera reference");
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

  const buttons = () => {
    return (
      <View style={styles.buttons}>
        <Button title="Flip Camera" onPress={toggleType}></Button>
        {mediaType === "photo" ? (
          <Button
            title={loading ? "Processing Photo" : "Take Photo"}
            onPress={takePhoto}
          />
        ) : (
          <Pressable style={styles.record} onPress={takeVideo}>
            <Text>{isRecording ? "Recording.." : "Take Video"}</Text>
          </Pressable>
        )}
        <Button title="Go Back" onPress={() => navigation.navigate("Form")} />
        <Button title="Change Camera Mode" onPress={toggleCameraMode} />
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
});
