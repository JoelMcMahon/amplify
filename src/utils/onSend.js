import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

export default function onSend(roomId, senderId, messageBody) {
  const data = {
    senderId,
    body: messageBody,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const db = firebase.firestore();
  db.collection('chats').doc(roomId).collection('messages').add(data);
}
