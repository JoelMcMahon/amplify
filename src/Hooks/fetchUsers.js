import { useState, useEffect } from "react";
import firebase from "firebase";

export default function fetchUsers() {
  const [searchStr, setSearchStr] = useState("");
  const [usersArray, setUsersArr] = useState([]);
  useEffect(() => {
    searchUsers(searchStr);
  }, [searchStr]);

  const searchUsers = (searchStr) => {
    const db = firebase.firestore();
    db.collection("users")
      .orderBy("displayName")
      .startAt(searchStr)
      .limit(10)
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
