import React, { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import MapScreen from "../MapScreen/MapScreen";
import ListScreen from "../ListScreen/ListScreen";
import useMarkers from "../../Hooks/useMarkers";
import { useMap } from "../../Hooks/testMapHook";
import PostFeed from "../../utils/PostFeed";
// import RequestLocationData from "../../utils/RequestLocationData";

export default function HomeScreen() {
  const [viewToggle, setViewToggle] = useState("map");

  const { ads, loading } = useMap();

  if (loading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  const mapToggle = () => setViewToggle(viewToggle === "map" ? "list" : "map");

  return (
    <View style={styles.container}>
      <Button title="Map" onPress={mapToggle}></Button>
      <Button title="List" onPress={mapToggle}></Button>
      {viewToggle === "map" && <MapScreen />}
      {viewToggle === "list" && <PostFeed ads={ads} />}
    </View>
  );
}
