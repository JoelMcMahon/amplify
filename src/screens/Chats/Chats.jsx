import React, { useState } from "react";
import { Text } from "react-native";
import styles from "./styles";

import { Card, Subheading, Title } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
import fetchUsers from "../../Hooks/fetchUsers";
import createChatRoom from "../../utils/createChatRoom";
import getSingleChat from "../../utils/getSingleChat";

const Chats = ({ navigation, chatArray, usersArray, currUser }) => {
  const { searchStr, setSearchStr } = fetchUsers();
  const [tempMessages, setTempMessages] = useState([]);
  // console.log(chatArray, "<<<<<<<< chat array for ", currUser.displayName);
  return (
    <ScrollView>
      <SearchBar
        placeholder="Search"
        value={searchStr}
        onChangeText={(newText) => {
          setSearchStr(newText);
        }}
      />
      {searchStr
        ? usersArray.map((user) => {
            return (
              <Card key={user.id}>
                <Card.Content style={{ textAlign: "center" }}>
                  <TouchableOpacity
                    onPress={async () => {
                      const newRoomId = await createChatRoom(
                        currUser.id,
                        currUser.displayName,
                        user.id,
                        user.displayName,
                        chatArray
                      );
                      // console.log(newRoomId, "<newId");
                      navigation.navigate({
                        name: "SingleChat",
                        params: newRoomId,
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
          <Card key={roomId.id}>
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
                  {" "}
                  {roomId.displayNames[0] === currUser.displayName
                    ? roomId.displayNames[1]
                    : roomId.displayNames[0]}
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
