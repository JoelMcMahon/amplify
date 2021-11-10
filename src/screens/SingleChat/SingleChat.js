import React, { useParams, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";
// import onSend from "../../utils/onSend";
import formatMessageBeforeAdding from "../../utils/formatMessageBeforeAdding";

export default function SingleChat(props) {
  setInterval(() => {
    fetchChatsOnPage();
  }, 1000);
  const roomId = props.route.params.roomId;
  console.log(props, "<<<<<<<,props");
  const messagesObject = props.messagesObject;
  const messagesArray = props.route.params.messages;
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(Object.keys(props), "<<<<<<<<<<<<<props in singlechat");
  // console.log(messagesObject, "<<<<<<<<<<<<<messagesObject in single chat");
  useEffect(() => {
    setMessages(messagesArray);
    setIsLoading(false);
  }, [messagesArray]);

  // console.log(roomId, "<<<<<<<room id in single chat");
  // const messages = messagesObject[roomId];
  const [messageBody, setMessageBody] = useState("");
  const userId = firebase.auth().currentUser.uid;

  // console.log(messageBody, "<<messageBody");

  function renderBubble(props) {
    return (
      <Bubble
        key={Math.random()}
        {...props}
        wrapperStyle={{
          right: { backgroundColor: "#6646ee" },
          left: { backgroundColor: "black" },
        }}
        textStyle={{ right: { color: "#fff" }, left: { color: "white" } }}
      />
    );
  }

  return isLoading ? (
    <View>
      <Text>Loading ...</Text>
    </View>
  ) : (
    <View style={{ height: "100%" }}>
      <GiftedChat
        onInputTextChanged={(text) => {
          setMessageBody(text);
        }}
        onSend={async () => {
          const newMessage = formatMessageBeforeAdding(
            messageBody,
            messagesArray.length
          );
          messagesArray.unshift(newMessage);

          setMessageBody("");
        }}
        renderBubble={renderBubble}
        user={{ _id: 2 }}
        messages={messagesArray}
      />
    </View>
  );
}
