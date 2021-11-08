import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { firebase } from "../firebase/config";

export const userAppAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
            AsyncStorage.setItem('userData',JSON.stringify(userData))
          })
          .catch((error) => {
            console.warn(error);
          });
      } else {
        console.warn("Invalid user");
      }
    });
  }, []);

  return { user, setUser };
};
