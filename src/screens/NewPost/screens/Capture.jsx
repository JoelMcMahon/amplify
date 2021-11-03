import { Camera } from "expo-camera";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useCamera } from "../hooks/camera";

const Capture = ({ navigation, setMedia }) => {
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(null);

  const { type, toggleType, mediaType, toggleMediaType, hasPermission } =
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

  const buttons = () => {
    return (
      <View style={styles.buttons}>
        <Button title="Flip Camera" onPress={toggleType}></Button>
        <Button
          title={loading ? "Processing Photo" : "Take Photo"}
          onPress={takePhoto}
        ></Button>
        {/* <Button title="Go back to form" onPress={toggleCam}></Button>
        <Button
          title={mediaType === "photo" ? "Go to video" : "Go to photo"}
          onPress={toggleMediaType}
        ></Button>
        <Button
          title={loading ? "Processing photo" : "Take Photo"}
          disabled={loading && "true"}
          onPress={takePicture}
        ></Button> */}
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
});
