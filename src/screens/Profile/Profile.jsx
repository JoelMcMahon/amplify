import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import PostFeed from "../PostFeed/PostFeed";
import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from "./ProfilePage";
import SingleAd from "../SingleAd/SingleAd";

const Stack = createStackNavigator();

const Profile = ({ user, setUser, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [currentAd, setCurrentAd] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      await db
        .collection("ads")
        .where("userId", "==", user.id)
        .orderBy("created")
        .get()
        .then((docs) => {
          let allPosts = [];
          docs.forEach((doc) => {
            allPosts.unshift(doc.data());
          });
          setPosts(allPosts);
        });
    };

    getPosts();
  }, []);

  const navToAd = (ad) => {
    navigation.navigate("SingleAd");
    setCurrentAd(ad);
  };

  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="ProfileInfo">
        {(props) => <ProfilePage {...props} user={user} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name="ProfilePosts">
        {(props) => <PostFeed {...props} ads={posts} navToAd={navToAd} />}
      </Stack.Screen>
      <Stack.Screen name="SingleAd">
        {(props) => (
          <SingleAd {...props} currentAd={currentAd} onProfile={true} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Profile;
