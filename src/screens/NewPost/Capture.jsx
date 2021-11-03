import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { StyleSheet, Text, View, Button } from "react-native";
import { useCamera } from "./hooks/camera";
import { styles } from "./styles";

const Capture = ({ toggleCam, setMedia }) => {
  const [camera, setCamera] = useState(null);
  const [currentMedia, setCurrentMedia] = useState(null);
  const { type, toggleType, mediaType, toggleMediaType, hasPermission } =
    useCamera();

  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [currentMedia]);

  const takePicture = async () => {
    if (camera) {
      setLoading(true);
      const { uri } = await camera.takePictureAsync(null);
      setLoading(false);
      setCurrentMedia(uri);
    } else {
      console.log("Error with camera reference");
    }
  };

  const buttons = () => {
    return (
      <View style={styles.buttons}>
        <Button title="Flip Camera" onPress={toggleType}></Button>
        <Button title="Go back to form" onPress={toggleCam}></Button>
        <Button
          title={mediaType === "photo" ? "Go to video" : "Go to photo"}
          onPress={toggleMediaType}
        ></Button>
        <Button
          title={loading ? "Processing photo" : "Take Photo"}
          disabled={loading && "true"}
          onPress={takePicture}
        ></Button>
      </View>
    );
  };

  if (currentMedia) {
    const cancelPhoto = () => {
      setCurrentMedia(null);
    };

    const confirmPhoto = () => {
      setMedia(currentMedia);
      setCurrentMedia(null);
    };

    return (
      <View>
        <Image style={styles.fullScreen} source={{ uri: currentMedia }}></Image>
        <View style={styles.confirmDenyButtons}>
          <Button title="confirm" onPress={confirmPhoto}></Button>
          <Button title="cancel" onPress={cancelPhoto}></Button>
        </View>
      </View>
    );
  }

  if (!hasPermission)
    return (
      <View>
        <Text>No Camera Permissions</Text>
      </View>
    );

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
