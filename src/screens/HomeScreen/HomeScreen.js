import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import styles from "./styles";
import MapScreen from "../MapScreen/MapScreen";
import PostFeed from "../../utils/PostFeed";
import { useMap } from "../../Hooks/useMarkers";

export default function HomeScreen() {
  const [viewToggle, setViewToggle] = useState("map");

  const { ads, loading, lastLocation } = useMap();

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
      <Button
        title={viewToggle === "map" ? "Go to list" : "Go to map"}
        onPress={mapToggle}
      ></Button>
      {viewToggle === "map" && (
        <MapScreen ads={ads} lastLocation={lastLocation} />
      )}
      {viewToggle === "list" && <PostFeed ads={ads} mainList={true} />}
    </View>
  );
}
