import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { update } from 'firebase';

export default async function onSend(roomId, senderId, messageBody) {
  const data = {
    senderId,
    body: messageBody,
  };

  const db = firebase.firestore();
  await db
    .collection('chats')
    .doc(roomId)
    .collection('messages')
    .add(data)
    .then((ref) => {
      const docRef = db
        .collection('chats')
        .doc(roomId)
        .collection('messages')
        .doc(ref.id);
      docRef.update({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    });
}
