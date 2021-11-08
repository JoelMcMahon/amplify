import { Video } from "expo-av";
import React from "react";
import { Image } from "react-native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { formatDate } from "./date";

const PostFeed = ({ ads, mainList }) => {
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
        {media(item.type, item.url)}
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
  media: {
    height: 200,
    width: 200,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  individualPost: {
    marginTop: 10,
    backgroundColor: "gray",
  },
});
