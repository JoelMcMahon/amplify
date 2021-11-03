import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Button } from "react-native-elements";
import useMarkers from "../../Hooks/useMarkers";

export default function ListScreen() {
  const { markerArray } = useMarkers();
  return (
    <View>
      <ScrollView>
        {markerArray.map((marker, index) => {
          return (
            <Card key={index} style={styles.title}>
              <Card.Title>
                Latitude:{marker.lat} Longitude:{marker.long}
              </Card.Title>
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                }}
              />
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    zIndex: 100,
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
});
