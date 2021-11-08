import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase/config";

export default function useChats() {
  const [chatArray, setChatArray] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const parsedUserData = JSON.parse(userData);
        const userId = parsedUserData.id;

        await db
          .collection("chats")
          .where("users", "array-contains", userId)
          .onSnapshot((snapshot) => {
            const tempRooms = [];
            snapshot.docs.forEach((doc) => {
              const users = doc.data().users;
              const id = doc.id;
              tempRooms.push({ id, users });
            });
            AsyncStorage.setItem("chatRooms", JSON.stringify(tempRooms));
            setChatArray(tempRooms);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchChats();
  }, []);

  return { chatArray };
}
