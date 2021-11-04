import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SingleChat from '../SingleChat/SingleChat';
import Chats from '../Chats/Chats';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function InboxScreen() {
  const [chatSelected, setChatSelected] = useState(false);
  const [roomId, setRoomId] = useState('');

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Chats">
        {(props) => <Chats {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SingleChat">
        {(props) => <SingleChat {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
