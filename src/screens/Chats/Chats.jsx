import React from 'react';
import { Text, View } from 'react-native';

import { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import firebase from 'firebase';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import useChats from '../../Hooks/useChats';
import { Card } from 'react-native-elements/dist/card/Card';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import fetchUsers from '../../Hooks/fetchUsers';
import createChatRoom from '../../utils/createChatRoom';

const Chats = ({ navigation }) => {
  const { chatArray } = useChats();
  const userId = firebase.auth().currentUser.uid;

  const { searchStr, setSearchStr, usersArray } = fetchUsers();

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
              <Card>
                <TouchableOpacity
                  onPress={async () => {
                    const newRoomId = await createChatRoom(userId, user.id, chatArray);
                    console.log(newRoomId, '<newId');
                    navigation.navigate({
                      name: 'SingleChat',
                      params: newRoomId,
                    });
                    setSearchStr('');
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
          <Card>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate({ name: 'SingleChat', params: roomId.id });
              }}
            >
              <Text> {roomId.id}</Text>
            </TouchableOpacity>
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default Chats;
