import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const PostFeed = ({ adArray }) => {
  const post = ({ item }) => {
    return (
      <View>
        <Text>{item.body}</Text>
      </View>
      //need condition to render different file types
    );
  };
  return (
    <View>
      <FlatList
        data={adArray}
        renderItem={post}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default PostFeed;

const styles = StyleSheet.create({});
