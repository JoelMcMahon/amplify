import React, { useParams } from 'react';
import { View, Text } from 'react-native';
import useMessages from '../../Hooks/useMessages';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';

export default function SingleChat(props) {
  const roomId = props.route.params;
  const messages = useMessages(roomId);

  function renderBubble(props) {
    // if ()
    return <Bubble {...props} wrapperStyle={{right:{backgroundColor:'#6646ee'}, left:{backgroundColor:'black'}}} textStyle={{right:{color:'#fff'}, left:{color:'white'}}}/>
  }

  return (
    <View style={{ height: '60%' }}>
      <GiftedChat
      renderBubble={renderBubble}
        user={{ _id: 2 }}
        messages={messages}
      />
    </View>
  );
}
