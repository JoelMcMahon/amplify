import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import styles from "./styles";
import { Card, Subheading, Title } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
import fetchUsers from "../../Hooks/fetchUsers";
import createChatRoom from "../../utils/createChatRoom";
import getSingleChat from "../../utils/getSingleChat";
import { LinearGradient } from "expo-linear-gradient";
const Chats = ({ navigation, chatArray, usersArray, currUser }) => {
  const { searchStr, setSearchStr } = fetchUsers();
  const [tempMessages, setTempMessages] = useState([]);
  // console.log(chatArray, "<<<<<<<< chat array for ", currUser.displayName);
  return (
    <ScrollView style={styles.background}>
      <SearchBar
        placeholder="Search"
        value={searchStr}
        onChangeText={(newText) => {
          setSearchStr(newText);
        }}
        style={styles.searchBar}
      />
      {searchStr
        ? usersArray.map((user) => {
            return (
              <Card key={user.id}>
                <Card.Content style={styles.userCard}>
                  <TouchableOpacity
                    onPress={async () => {
                      const newRoomId = await createChatRoom(
                        currUser.id,
                        currUser.displayName,
                        user.id,
                        user.displayName,
                        chatArray
                      );
                      const messages = await getSingleChat(newRoomId, currUser);
                      // console.log(newRoomId, "<newId");
                      navigation.navigate({
                        name: "SingleChat",
                        params: { roomId: newRoomId, messages },
                      });
                      setSearchStr("");
                    }}
                  >
                    <Title>{user.displayName}</Title>
                    <Subheading>Hi...</Subheading>
                  </TouchableOpacity>
                </Card.Content>
              </Card>
            );
          })
        : null}
      {chatArray.map((roomId) => {
        return (
          <Card key={roomId.id} style={styles.card}>
            <Card.Content>
              <TouchableOpacity
                onPress={async () => {
                  const messages = await getSingleChat(roomId.id, currUser);

                  navigation.navigate({
                    name: "SingleChat",
                    params: { roomId: roomId.id, messages },
                  });
                }}
              >
                <Title>
                  <Text styles={styles.text}>
                    {" "}
                    {roomId.displayNames[0] === currUser.displayName
                      ? roomId.displayNames[1]
                      : roomId.displayNames[0]}
                  </Text>
                </Title>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default Chats;
