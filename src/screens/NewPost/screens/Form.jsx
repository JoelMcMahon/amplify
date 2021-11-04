import { Video } from "expo-av";
import React, { useState } from "react";
import { Image } from "react-native";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { uploadAd } from "../dbInteraction";
import loadingIcon from "../../../images/loading.gif";

const Form = ({ navigation, media, setMedia }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [uploadingAd, setUploadingAd] = useState(false);
  const [error, setError] = useState(false);

  const navigateToCapture = () => {
    setMedia({ type: null, uri: null });
    navigation.navigate("Capture");
  };

  const mediaPlaceholder = () => {
    if (media.type === "photo") {
      return (
        <Image source={{ uri: media.uri }} style={styles.mediaPlaceholder} />
      );
    } else if (media.type === "video") {
      return (
        <Video
          source={{ uri: media.uri }}
          style={styles.mediaPlaceholder}
          useNativeControls
          isLooping
        />
      );
    } else {
      return (
        <View style={styles.mediaPlaceholder}>
          <Text>No Media. You can add a photo or video below!</Text>
        </View>
      );
    }
  };

  if (uploadingAd) {
    return (
      <View style={styles.uploadingContainer}>
        <Image source={loadingIcon} />
      </View>
    );
  }

  return (
    //Checks if any media is being held and displays the correct component
    <View style={styles.formContainer}>
      {mediaPlaceholder()}
      <View>
        <Button
          onPress={navigateToCapture}
          title={media.uri ? "Change Photo/Video" : "Add Photo/Video"}
        />
        <TextInput
          placeholder="Title.."
          onChangeText={(value) => setTitle(value)}
          style={styles.formInput}
        />
        <TextInput
          placeholder="Tell us more.."
          onChangeText={(value) => setBody(value)}
          style={styles.formInput}
        />
        {error && (
          <Text style={styles.error}>
            Both title and body fields must be filled
          </Text>
        )}
      </View>
      <Button
        onPress={() => {
          uploadAd(setUploadingAd, title, body, media, setError);
        }}
        title={uploadingAd ? "Uploading.." : "Upload Ad"}
      />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  mediaPlaceholder: {
    height: "60%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ededed",
  },
  error: {
    fontSize: 10,
    color: "red",
  },
  formInput: {
    textAlign: "center",
    backgroundColor: "#ededed",
    height: 50,
    marginTop: 5,
    fontSize: 22,
  },
  uploadingContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
