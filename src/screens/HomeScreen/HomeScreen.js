import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

import { MapScreen } from "..";

import RequestLocationData from "../../utils/RequestLocationData";

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          RequestLocationData();

          setMapToggle(false);
        }}
      >
        <Text>Set Location</Text>
      </TouchableOpacity>
      <MapScreen />
    </View>
  );
}
