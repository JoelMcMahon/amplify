import React, { useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import useMarkers from "../../Hooks/useMarkers";
import { TouchableOpacity } from "react-native-gesture-handler";
import RequestLocationData from "../../utils/RequestLocationData";

export default function MapScreen() {
  const { markerArray, mapToggle, setMapToggle } = useMarkers();

  console.log(markerArray, "marker in map");
  const initRegion = {
    latitude: 53.661119347171336,
    latitudeDelta: 0.0003385718758650569,
    longitude: -2.966440352731869,
    longitudeDelta: 0.00039982805485072603,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={initRegion}>
        {markerArray}
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
});
