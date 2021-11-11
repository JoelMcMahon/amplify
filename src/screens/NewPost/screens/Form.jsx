import { Video } from "expo-av";
import React, { useState } from "react";
import { Image } from "react-native";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { uploadAd } from "../dbInteraction";
import loadingIcon from "../../../images/loading.gif";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";

const Form = ({ navigation, media, setMedia, user, setUpdateMap }) => {
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
        <LinearGradient
          colors={["#252525", "#181818"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#e05c10" }}>
            No Media. You can add a photo or video below!
          </Text>
        </LinearGradient>
      );
    }
  };

  if (uploadingAd) {
    return (
      <View style={styles.uploadingContainer}>
        <Image source={loadingIcon} style={{ height: 75, width: 75 }} />
        <Text style={{ color: "#e05c10" }}>Uploading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.formContainer}
      scrollEnabled={true}
      extraScrollHeight={10}
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
              uploadAd(
                setUploadingAd,
                title,
                body,
                media,
                setError,
                user,
                setUpdateMap,
                navigation
              );
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
    backgroundColor: "#252525",
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
