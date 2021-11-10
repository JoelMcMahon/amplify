import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase/config";
// import useChats from './useChats';

export default function useMessages(chatArray, user) {
  const [messagesArray, setMessagesArray] = useState([]);
  const [tempMessages, setTempMessages] = useState([]);
  const [messagesObject, setMessagesObject] = useState({});
  console.log(user);

  useEffect(() => {
    chatArray.map((roomId) => {
      const roomname = roomId.id;
      fetchMessages(roomId.id, user);
      // console.log(
      //   messagesObject,
      //   // messagesObject["0"],
      //   "<<<<<<<<<<<<<room ids in useEffecty"
      // );
      setMessagesObject((currObject) => {
        // const currEntries = { ...currObject };
        // console.log(currObject, "<<<currobject");
        const updatedObject = { ...currObject, [roomname]: messagesArray };
        // console.log(updatedObject, "<<<<<<< current entries");
        return updatedObject;
      });
    });
  }, [, chatArray]);

  // useEffect(() => {
  //   // console.log(messagesObject, "messages object in use effect");
  // }, [messagesArray]);

  const fetchMessages = (currRoomId, user) => {
    try {
      const currUserID = user.id;

      db.doc(`chats/${currRoomId}`).onSnapshot((snapshot) => {
        const data = snapshot.data();
        console.log(data);
        if (data.messages) {
          // console.log(data.messages, "<<<<<<<<<<messages");
        }
        const formattedMessages = data.messages
          .reverse()
          .map((message, index) => {
            const id = () => {
              if (message.senderID === currUserID) {
                return 1;
              } else {
                return 2;
              }
            };
            const formattedTime = new Date(message.createdAt);
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

        setMessagesArray(formattedMessages);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return messagesObject;
}
