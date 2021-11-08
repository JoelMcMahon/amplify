import { Video } from "expo-av";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, Button, Image } from "react-native";
import { displayMedia } from "../Hooks/displayMedia";
import { formatDate } from "./date";

const PostFeed = ({ ads, mainList, setCurrentAd, navigation }) => {
  const post = ({ item }) => {
    let date, textTime;

    if (item.created) {
      const { formattedDate, elapsedTime } = formatDate(item.created);
      date = formattedDate;
      textTime = elapsedTime;
    }

    const handleSingleAdPress = () => {
      setCurrentAd(item);
      navigation.navigate("SingleAd");
    };

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
        <Button title="Single Ad" onPress={handleSingleAdPress}></Button>
      </View>
    );
  };

  return (
    <View>
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
