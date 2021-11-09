import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
} from "react-native";
import { displayMedia } from "../../Hooks/displayMedia";
import { formatDate } from "../../utils/date";
import buttonStyle from "../HomeScreen/styles";
import { FontAwesome5 } from "@expo/vector-icons";

const PostFeed = ({ ads, mainList, navToAd, navigation }) => {
  const navToMap = () => {
    navigation.navigate("Map");
  };

  const post = ({ item }) => {
    let date, textTime;

    if (item.created) {
      const { formattedDate, elapsedTime } = formatDate(item.created);
      date = formattedDate;
      textTime = elapsedTime;
    }

    return (
      <View style={styles.individualPost}>
        <Text>{mainList && item.displayName}</Text>
        <Text>{item.title}</Text>
        <Text>{item.body}</Text>
        {item.created && (
          <>
            <Text>{date}</Text>
            <Text>{textTime}</Text>
          </>
        )}
        {displayMedia(item.type, item.url)}
        <Button title="Single Ad" onPress={() => navToAd(item)}></Button>
      </View>
    );
  };

  if (ads.length === 0) {
    return (
      <View>
        <Text>No ads found</Text>
      </View>
    );
  }

  return (
    <View>
      {mainList && (
        <Pressable onPress={navToMap} style={buttonStyle.Pressable}>
          <Text style={styles.Text}>
            <FontAwesome5 name="map-marked-alt" size={35} color="grey" />
          </Text>
        </Pressable>
      )}
      <FlatList
        data={ads}
        renderItem={post}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default PostFeed;

const styles = StyleSheet.create({
  individualPost: {
    marginTop: 10,
    borderWidth: 1,
  },
});
