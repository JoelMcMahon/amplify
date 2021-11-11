import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase/config";

export default function useChats(user) {
  const [chatArray, setChatArray] = useState([]);

  useEffect(() => {
    // console.log(user, "<<<<<<<<<in useeffect");
    const fetchChats = async () => {
      try {
        const userId = user.id;

        db.collection("chats")
          .where("users", "array-contains", userId)
          .onSnapshot((snapshot) => {
            const tempRooms = [];
            snapshot.docs.forEach((doc) => {
              const displayNames = doc.data().displayNames;
              const users = doc.data().users;
              // console.log(users, "<<< USERS");
              const id = doc.id;
              tempRooms.push({ id, users, displayNames });
            });
            AsyncStorage.setItem("chatRooms", JSON.stringify(tempRooms));
            setChatArray(tempRooms);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchChats();
  }, [user]);

  return { chatArray };
}
