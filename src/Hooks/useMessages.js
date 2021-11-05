import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

export default function useMessages(roomId) {
  const db = firebase.firestore();
  const [messagesArray, setMessagesArray] = useState([]);
  const auth = firebase.auth();
  const userId = auth.currentUser.uid;

  const fetchMessages = async () => {
    console.log(roomId, '<<rooomid');
    await db.collection(`chats/${roomId}/messages/`).onSnapshot((snapshot) => {
      const messages = snapshot.docs.map((doc,index) => {

          const message= doc.data();
          console.log(message,"<message")
        const id = () => {
          if (message.senderID === userId) {
            return 1;
          } else {
            return 2;
          }
        };
        const formattedMessage = {
          _id:index ,
          text: message.body,
          createdAt:  new Date(message.createdAt.seconds *1000).toISOString(),
          user:{
              _id:id()
          }
        };

       
        console.log(formattedMessage.createdAt,"<<formatted msg")
        return  formattedMessage;
      });
      setMessagesArray(messages);
    });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return messagesArray;
}
