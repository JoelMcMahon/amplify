import React, { useState } from "react";
import { Button, Text, View, Pressable } from "react-native";
import styles from "./styles";
import MapScreen from "../MapScreen/MapScreen";
import PostFeed from "../../utils/PostFeed";
import { useMap } from "../../Hooks/useMarkers";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

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
      <Pressable onPress={mapToggle} style={styles.Pressable}>
        <Text style={styles.Text}>
          {viewToggle === "map" ? (
            <FontAwesome name="th-list" size={35} color="grey" />
          ) : (
            <FontAwesome5 name="map-marked-alt" size={35} color="grey" />
          )}
        </Text>
      </Pressable>
      {viewToggle === "map" && (
        <MapScreen ads={ads} lastLocation={lastLocation} />
      )}
      {viewToggle === "list" && <PostFeed ads={ads} mainList={true} />}
    </View>
  );
}
