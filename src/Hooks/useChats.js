import React from 'react';
import { View, Text } from 'react-native';
import { useState } from 'react';
import firebase from 'firebase';
import { getAuth } from "firebase/auth";

export default function useChats() {
  const [chatArray, setChatArray] = useState([]);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const user = auth.currentUser;
  console.log(user,'<<<user')

  const fetchChats = () => {
      db.collection('chats').where('users','array-contains','')
  };

//   return (
//     <View>
//       <Text></Text>
//     </View>
//   );
}
