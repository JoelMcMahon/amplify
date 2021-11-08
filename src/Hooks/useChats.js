import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useState } from 'react';
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useChats() {
  const [chatArray, setChatArray] = useState([]);

  const db = firebase.firestore();

  const fetchChats = async (userId) => {
    await db
      .collection('chats')
      .where('users', 'array-contains', userID)
      .onSnapshot((snapshot) => {
        const tempRooms = [];
        snapshot.docs.forEach((doc) => {
          const users = doc.data().users;
          const id = doc.id;
          tempRooms.push({ id, users });
        });

        AsyncStorage.setItem('chatRooms', JSON.stringify(tempRooms));
      });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = JSON.parse(userData);
      console.log(parsedUserData, 'userData ');
      const userId = parsedUserData.id;
      console.log(userId, 'user id');
    };
    fetchUserData();

    fetchChats(userId);
  }, []);

  return { chatArray };
  // console.log(fetchChats(), '<<<<chats');

  //   return (
  //     <View>
  //       <Text></Text>
  //     </View>
  //   );
}
