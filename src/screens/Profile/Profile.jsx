import React, { useState } from "react";
import { Pressable, Text, View, Button } from "react-native";
import { logoutHandler } from "../../utils/dbInteraction";
import PostFeed from "../../utils/PostFeed";
import style from "./style";
// import { Button } from "react-native-elements/dist/buttons/Button";

const Profile = ({ user, setUser }) => {
  const { fullName, displayName, id, email } = user;

  const [showPosts, setShowPosts] = useState(false);

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  return (
    <>
      <Button title="Posts" onPress={togglePosts} />
      {showPosts ? (
        <>
          <PostFeed collection={"ads"} queries={["userId", "==", user.id]} />
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
