import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

export default function fetchUsers() {
  const [searchStr, setSearchStr] = useState('');
  const [usersArray, setUsersArr] = useState([]);
  useEffect(() => {
    searchUsers();
  }, [searchStr]);

  const searchUsers = () => {
    const db = firebase.firestore();
    db.collection('users')
      .orderBy('displayName')
      .startAt(searchStr)
      .limit(5)
      .get()
      .then((users) => {
        const data = users.docs.map((doc) => {
          return doc.data();
        });

        setUsersArr(data);
      });
  };

  return { searchStr, setSearchStr, usersArray };
}
