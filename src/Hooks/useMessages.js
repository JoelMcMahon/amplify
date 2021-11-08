import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase/config";
// import useChats from './useChats';

export default async function useMessages(chatArray) {
  const [messagesArray, setMessagesArray] = useState([]);
  useEffect(() => {
    chatArray.map((roomId) => {
      fetchMessages(roomId);
    });
  }, []);

  const fetchMessages = async (roomId) => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);
      console.log(parsedUserData, "userData  in use messages");
      console.log(roomId, "<<rooomid");
      db.collection(`chats/${roomId}/messages/`)
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
    } catch (error) {
      console.log(error);
    }
  };

  return messagesArray;
}
