import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { Image } from "react-native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { db } from "../firebase/config";
import { formatDate } from "./date";

const PostFeed = ({ collection, queries }) => {
  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState("asc");

  const toggleOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    const getPosts = async () => {
      await db
        .collection(collection)
        .where(...queries)
        .orderBy("created", order)
        .onSnapshot((snapshot) => {
          let allPosts = [];
          snapshot.forEach((doc) => {
            allPosts.unshift(doc.data());
          });
          setPosts(allPosts);
        });
    };

    getPosts();
  }, [order]);

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
        <Text>{item.title}</Text>
        <Text>{item.body}</Text>
        {item.created && (
          <>
            <Text>{date}</Text>
            <Text>{textTime}</Text>
          </>
        )}
        {/* <Text>{Date(item.created)}</Text> */}
        {media(item.type, item.url)}
      </View>
    );
  };

  return (
    <View>
      <Button
        title={order === "desc" ? "Oldest first" : "Latest first"}
        onPress={toggleOrder}
      />
      <FlatList
        data={posts}
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
