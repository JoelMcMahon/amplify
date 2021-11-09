import React from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
import { update } from "firebase";

export default async function onSend(roomId, senderId, messageBody) {
  const data = {
    senderId,
    body: messageBody,
    createdAt: Date.now(),
  };

  const db = firebase.firestore();
  await db
    .collection("chats")
    .doc(roomId)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion(data),
    });
}
