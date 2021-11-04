import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { logoutHandler } from "../../utils/dbInteraction";
import PostFeed from "../../utils/PostFeed";
import style from "./style";
import { db } from "../../firebase/config";
import { Button } from "react-native-elements/dist/buttons/Button";

const Profile = ({ user, setUser }) => {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      await db
        .collection("ads")
        .where("userId", "==", user.id)
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          let allPosts = [];
          snapshot.forEach((doc) => {
            allPosts.unshift(doc.data());
          });
          setPosts(allPosts);
        });
    };

    getPosts();
  }, []);

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  const { fullName, displayName, id, email } = user;

  return (
    <>
      {showPosts ? (
        <PostFeed adArray={posts} />
      ) : (
        <>
          <View style={style.container}>
            <Text>User: {fullName}</Text>
            <Text>Display Name: {displayName}</Text>
            <Text>Email: {email}</Text>
            <Text>Posts: {posts.length}</Text>

            <Button title="check" onPress={() => console.log(posts)} />
            <Pressable
              onPress={() => {
                logoutHandler(setUser);
              }}
              style={style.logout}
            >
              <Text style={style.buttonText}>Logout</Text>
            </Pressable>
          </View>
          <Button title="Posts" onPress={togglePosts} />
        </>
      )}
    </>
  );
};

export default Profile;
