import React from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RequestLocationData from "../../utils/RequestLocationData";
import buttonStyle from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { displayMedia } from "../../Hooks/displayMedia";

export default function MapScreen({
  ads,
  lastLocation,
  navToAd,
  navigation,
  currentUser,
}) {
  const initRegion = {
    latitude: lastLocation.latitude,
    latitudeDelta: 0.008,
    longitude: lastLocation.longitude,
    longitudeDelta: 0.0008,
  };

  const navToList = () => {
    navigation.navigate("HomePosts");
  };

  const seeMoreFromPin = (ad) => {
    navToAd(ad);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={navToList} style={buttonStyle.Pressable}>
        <View
          style={{
            backgroundColor: "#E36B09",
            padding: 5,
            borderRadius: 4,
            paddingTop: 8,
            paddingRight: 14,
            paddingLeft: 14,
          }}
        >
          <FontAwesome name="th-list" size={35} color="#5A5A5A" />
        </View>
      </Pressable>
      <MapView style={styles.map} region={initRegion}>
        {ads.map((ad, index) => {
          return (
            <Marker
              key={index}
              coordinate={{ latitude: ad.lat, longitude: ad.long }}
            >
              <Callout tooltip onPress={() => seeMoreFromPin(ad)}>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.title}>{ad.title}</Text>
                    {displayMedia(ad.type, ad.url)}
                    <Text>By: {ad.displayName}</Text>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <TouchableOpacity
        onPress={() => {
          RequestLocationData();
        }}
      >
        <Text>Set Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  media: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: 20,
    height: 20,
  },
});
