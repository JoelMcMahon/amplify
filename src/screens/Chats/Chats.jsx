import React from "react";
import { Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import firebase from "firebase";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const Chats = async () => {
  const [messages, setMessages] = useState([]);
  const db = firebase.firestore();
  const auth = firebase.auth();
  console.log(auth.currentUser, "user id");

  const chatRoomQuery = db.collection("chats/oDcyvDNAy6RraO0PW0Hg/messages");
  const snapshot = await chatRoomQuery.get();
  if (snapshot.empty) {
    console.log("nothing matched");
    return;
  } else {
    snapshot.forEach((doc) => {
      console.log(doc);
      console.log(doc.id, "=>", doc.data());
    });
  }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log(auth.currentUser, "user id");

    setMessages((previousMessages) => {
      GiftedChat.append(previousMessages, messages);
    });

    const { _id, createdAt, text, user } = messages[0];
    db.collection("chats").add(
      {
        _id,
        createdAt,
        text,
        user,
      },
      []
    );
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, height: "80%" }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={
          // auth.currentUser
          {
            _id: 1,
            // name: firebase.auth?.currentUser.fullName,
          }
        }
      />
    </View>
  );
};

export default Chats;
