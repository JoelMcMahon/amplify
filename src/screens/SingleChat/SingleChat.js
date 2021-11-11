import React, { useParams, useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  Bubble,
  GiftedChat,
  renderLoading,
  renderTicks,
  renderTime,
  Time,
} from "react-native-gifted-chat";
import { Button, DarkTheme } from "react-native-paper";
import firebase from "firebase";
// import onSend from "../../utils/onSend";
import formatMessageBeforeAdding from "../../utils/formatMessageBeforeAdding";

import onSend from "../../utils/onSend";

export default function SingleChat(props) {
  const roomId = props.route.params.roomId;
  const userId = firebase.auth().currentUser.uid;

  // console.log(props, "<<<<<<<,props");
  const messagesObject = props.messagesObject;
  const messagesArray = props.route.params.messages;
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(messagesArray)) {
      setMessages(messagesArray);
    }
    setIsLoading(false);
  }, [messagesArray]);

  // console.log(roomId, "<<<<<<<room id in single chat");
  // const messages = messagesObject[roomId];
  const [messageBody, setMessageBody] = useState("");

  // console.log(messageBody, "<<messageBody");

  function renderTime(props) {
    return (
      <Time
        {...props}
        timeTextStyle={{
          right: {
            color: "#000",
          },
          left: {
            color: "#000",
          },
        }}
      />
    );
  }

  function renderBubble(props) {
    return (
      <Bubble
        key={Math.random()}
        {...props}
        wrapperStyle={{
          right: { backgroundColor: "#DD7316", marginRight: 5 },
          left: { backgroundColor: "#16DDD7", marginLeft: -45 },
        }}
        textStyle={{ right: { color: "#000" }, left: { color: "#000" } }}
      />
    );
  }

  return isLoading ? (
    <View>
      <Text>Loading ...</Text>
    </View>
  ) : (
    <View style={{ height: "100%", backgroundColor: "#181818" }}>
      <GiftedChat
        onInputTextChanged={(text) => {
          setMessageBody(text);
        }}
        onSend={() => {
          let index = 0;
          if (Array.isArray(messages)) {
            index = messages.length;
          }
          const newMessage = formatMessageBeforeAdding(messageBody, index);
          messages.length === 0
            ? messages.push(newMessage)
            : messages.unshift(newMessage);

          setMessageBody("");
          onSend(roomId, userId, messageBody);
        }}
        renderBubble={renderBubble}
        user={{ _id: 1 }}
        messages={messages}
        renderLoading={renderLoading}
        renderTicks={renderTicks}
        renderTime={renderTime}
      />
    </View>
  );
}
