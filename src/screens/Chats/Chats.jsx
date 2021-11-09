import React, { useEffect } from "react";
import { Text } from "react-native";

import firebase from "firebase";
import { Card } from "react-native-elements/dist/card/Card";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
import fetchUsers from "../../Hooks/fetchUsers";
import createChatRoom from "../../utils/createChatRoom";

const Chats = ({ navigation, chatArray, usersArray, currUser }) => {
  const { searchStr, setSearchStr } = fetchUsers();
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
                <TouchableOpacity
                  onPress={async () => {
                    const newRoomId = await createChatRoom(
                      currUser.id,
                      currUser.displayName,
                      user.id,
                      user.displayName,
                      chatArray
                    );
                    console.log(newRoomId, "<newId");
                    navigation.navigate({
                      name: "SingleChat",
                      params: newRoomId,
                    });
                    setSearchStr("");
                  }}
                >
                  <Text>{user.displayName}</Text>
                </TouchableOpacity>
              </Card>
            );
          })
        : null}
      {chatArray.map((roomId) => {
        return (
          <Card key={roomId.id}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate({ name: "SingleChat", params: roomId.id });
              }}
            >
              <Text>
                {" "}
                {roomId.displayNames[0] === currUser.displayName
                  ? roomId.displayNames[1]
                  : roomId.displayNames[0]}
              </Text>
            </TouchableOpacity>
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default Chats;
