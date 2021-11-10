import { Video } from "expo-av";
import React, { useState } from "react";
import { Image } from "react-native";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { uploadAd } from "../dbInteraction";
import loadingIcon from "../../../images/loading.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Form = ({ navigation, media, setMedia, user }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [uploadingAd, setUploadingAd] = useState(true);
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
          <Text style={{ color: "#e05c10" }}>
            No Media. You can add a photo or video below!
          </Text>
        </View>
      );
    }
  };

  if (uploadingAd) {
    return (
      <View style={styles.uploadingContainer}>
        <Text>Uploading..</Text>
        <Image
          source={loadingIcon}
          style={{ height: 200, width: 200, backgroundColor: "red" }}
        />
      </View>
    );
  }

  return (
    //Checks if any media is being held and displays the correct component
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.formContainer}
      scrollEnabled={true}
      extraScrollHeight={10}
      // enableOnAndroid={true}
    >
      <View style={{ backgroundColor: "#252525", height: "100%" }}>
        <View style={styles.mediaContainer}>{mediaPlaceholder()}</View>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Button onPress={navigateToCapture} style={styles.bottomMargin}>
            {media.uri ? "Change Photo/Video" : "Add Photo/Video"}
          </Button>
          <TextInput
            placeholder="Title.."
            placeholderTextColor="white"
            onChangeText={(value) => setTitle(value)}
            style={[styles.formInput, styles.bottomMargin]}
          />
          <TextInput
            placeholder="Tell us more.."
            placeholderTextColor="white"
            onChangeText={(value) => setBody(value)}
            style={[styles.formInput, styles.bottomMargin]}
          />
          <Button
            onPress={() => {
              uploadAd(setUploadingAd, title, body, media, setError, user);
            }}
            style={styles.bottomMargin}
          >
            {uploadingAd ? "Uploading.." : "Upload Ad"}
          </Button>
          {error && (
            <Text style={styles.error}>
              Both title and body fields must be filled
            </Text>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    height: "100%",
  },

  mediaPlaceholder: {
    height: "100%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252525",
  },
  error: {
    fontSize: 10,
    color: "red",
    textAlign: "center",
  },
  formInput: {
    textAlign: "center",
    backgroundColor: "#302f2f",
    color: "white",
    height: 50,
    fontSize: 22,
    borderBottomColor: "#e05c10",
    borderBottomWidth: 4,
  },
  uploadingContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#302f2f",
    justifyContent: "center",
    alignItems: "center",
  },
  mediaContainer: {
    marginTop: 20,
    height: "55%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomMargin: {
    marginBottom: 10,
  },
});
