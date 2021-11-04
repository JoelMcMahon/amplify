import React from 'react';
import { Text, View } from 'react-native';

import { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import firebase from 'firebase';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import useChats from '../../Hooks/useChats';
import { Card } from 'react-native-elements/dist/card/Card';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

const Chats = ({navigation}) => {
  const { chatArray } = useChats();

  return (
    <View>
      {chatArray.map((roomId) => {
        return (
          <Card>
            <TouchableOpacity
              onPress={() => {
               navigation.navigate({name:'SingleChat',params:roomId})
              }}
            >
              <Text> {roomId}</Text>
            </TouchableOpacity>
          </Card>
        );
      })}
    </View>
  );
};

export default Chats;
