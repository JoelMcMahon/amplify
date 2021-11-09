import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase/config";
// import useChats from './useChats';

export default function useMessages(chatArray, user) {
  const [messagesArray, setMessagesArray] = useState([]);
  const [messagesObject, setMessagesObject] = useState({});

  useEffect(() => {
    chatArray.map((roomId) => {
      const roomname = roomId.id;
      fetchMessages(roomId.id, user);
      console.log(
        Object.keys(messagesObject),
        "<<<<<<<<<<<<<room ids in useEffecty"
      );
      setMessagesObject((currObject) => {
        return { ...currObject, [roomname]: messagesArray };
      });
    });
  }, [chatArray]);

  useEffect(() => {
    console.log(messagesObject, "messages object in use effect");
  }, [messagesObject]);

  const fetchMessages = (currRoomId, user) => {
    try {
      const currUserID = user.id;

      db.collection(`chats/${currRoomId}/messages/`)
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          const messages = snapshot.docs.map((doc, index) => {
            const message = doc.data();

            const id = () => {
              if (message.senderID === currUserID) {
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
          console.log(messages, currRoomId, "<<<<< messages and room id");
          setMessagesArray(messages);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return messagesObject;
}
