import React from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RequestLocationData from "../../utils/RequestLocationData";
import { Video } from "expo-av";

export default function MapScreen({ ads, lastLocation }) {
  const initRegion = {
    latitude: lastLocation.latitude,
    latitudeDelta: 0.008,
    longitude: lastLocation.longitude,
    longitudeDelta: 0.0008,
  };

  const media = (type, uri) => {
    if (type === "photo") {
      return <Image style={styles.media} source={{ uri }} />;
    } else if (type === "video") {
      return (
        <Video
          style={styles.media}
          source={{ uri }}
          useNativeControls
          isLooping
        />
      );
    } else {
      return (
        <View style={styles.media}>
          <Text>No Media</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={initRegion}>
        {ads.map((ad, index) => {
          return (
            <Marker
              key={index}
              coordinate={{ latitude: ad.lat, longitude: ad.long }}
            >
              <Callout
                tooltip
                onPress={() => {
                  //Load up specific ad screen here
                }}
              >
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.title}>{ad.title}</Text>
                    {media(ad.type, ad.url)}
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
