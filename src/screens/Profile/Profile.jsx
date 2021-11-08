import React, { useEffect, useState } from "react";
import { Pressable, Text, View, Button } from "react-native";
import { db } from "../../firebase/config";
import { logoutHandler } from "../../utils/dbInteraction";
import PostFeed from "../../utils/PostFeed";
import style from "./style";

const Profile = ({ user, setUser }) => {
  const { fullName, displayName, id, email } = user;

  const [showPosts, setShowPosts] = useState(false);

  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState("asc");

  const toggleOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    const getPosts = async () => {
      await db
        .collection("ads")
        .where("userId", "==", user.id)
        .orderBy("created", order)
        .onSnapshot((snapshot) => {
          let allPosts = [];
          snapshot.forEach((doc) => {
            allPosts.unshift(doc.data());
          });
          setPosts(allPosts);
        });
    };

    getPosts();
  }, [order]);

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  return (
    <>
      <Button title="Posts" onPress={togglePosts} />
      {showPosts ? (
        <>
          <Button
            title={order === "desc" ? "Oldest first" : "Latest first"}
            onPress={toggleOrder}
          />
          <PostFeed ads={posts} />
        </>
      ) : (
        <>
          <View style={style.container}>
            <Text>User: {fullName}</Text>
            <Text>Display Name: {displayName}</Text>
            <Text>Email: {email}</Text>

            <Pressable
              onPress={() => {
                logoutHandler(setUser);
              }}
              style={style.logout}
            >
              <Text style={style.buttonText}>Logout</Text>
            </Pressable>
          </View>
        </>
      )}
    </>
  );
};

export default Profile;
