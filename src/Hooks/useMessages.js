
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import useChats from './useChats';


export default async function useMessages(chatArray) {
  const db = firebase.firestore();
  const [messagesArray, setMessagesArray] = useState([]);
  // const auth = firebase.auth();
  // const userId = auth.currentUser.uid;
  try {

    const userData = await AsyncStorage.getItem('userData');
    const parsedUserData = JSON.parse(userData);
    console.log(parsedUserData, 'userData  in use messages');

  } catch (error) {
    console.log(error);
  }

  const fetchMessages = async (roomId) => {

    console.log(roomId, "<<rooomid");
    const messages = await db
      .collection(`chats/${roomId}/messages/`)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc, index) => {
          const message = doc.data();
          console.log(message, "<message");

          const id = () => {
            if (message.senderID === userId) {
              return 1;
            } else {
              return 2;
            }
          };
          const formattedTime = message.createdAt.seconds
            ? message.createdAt.seconds * 1000
            : new Date.now();

          const formattedMessage = {
            _id: index,
            text: message.body,
            createdAt: formattedTime,
            user: {
              _id: id(),
            },
          };



          return formattedMessage;
        });
        setMessagesArray(messages);
        AsyncStorage.setItem(
          `chats/${roomId}/messages`,
          JSON.stringify(messages)
        );
      });
  };

  useEffect(() => {
    chatArray.map((roomId) => {
      fetchMessages(roomId);
    });

  }, []);

  return messagesArray;
}
