import React from "react";
import { FlatList, Text, View, Pressable } from "react-native";
import { displayMedia } from "../../Hooks/displayMedia";
import { formatDate } from "../../utils/date";
import buttonStyle from "../HomeScreen/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { Card, Title, Button, Paragraph } from "react-native-paper";
import { styles } from "./Styles";
import { LinearGradient } from "expo-linear-gradient";

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
      <Card
        style={styles.individualPost}
        onPress={() => navToAd(item)}
        elevation={1}
        theme={{ colors: { text: styles.text } }}
        // mode={"outlined"}
      >
        {/* <Card.Cover source={{ uri: item.url }} /> */}
        {/* <Text>{mainList && item.displayName}</Text> */}
        {displayMedia(item.type, item.url, true)}
        <Card.Title
          title={item.title}
          subtitle={[mainList && item.displayName, item.created && textTime]}
          subtitleNumberOfLines={2}
        />
        <Card.Content>
          <Text style={styles.text}>{item.body}</Text>
        </Card.Content>
        <Button
          // style={(styles.button, styles.shadow)}
          onPress={() => navToAd(item)}
        >
          View Ad
        </Button>
      </Card>
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
      <LinearGradient
        colors={["#252525", "#181818"]}
        style={styles.background}
      />
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
