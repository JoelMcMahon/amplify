import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useState } from 'react';
import firebase from 'firebase';
import { getAuth } from 'firebase/auth';

export default function useChats() {
  const [chatArray, setChatArray] = useState([]);

  const db = firebase.firestore();
  const auth = firebase.auth();
  const user = auth.currentUser;
  const userID = user.uid;


  const fetchChats = async () => {
    await db
      .collection('chats')
      .where('users', 'array-contains', userID)
      .get()
      .then((snapshot) => {
        const tempRooms = [];
        snapshot.docs.forEach((doc) => {
          const id = doc.id;
          // setRoomIdArray((currIdArray) => {
          //   return [...currIdArray, id];
          // });
          tempRooms.push(id);
        });
        setChatArray(tempRooms);
      });
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return { chatArray };
  // console.log(fetchChats(), '<<<<chats');

  //   return (
  //     <View>
  //       <Text></Text>
  //     </View>
  //   );
}
