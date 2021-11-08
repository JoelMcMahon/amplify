import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import PostFeed from "../../utils/PostFeed";
import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from "./ProfilePage";
import SingleAd from "../SingleAd/SingleAd";

const Stack = createStackNavigator();

const Profile = ({ user, setUser }) => {
  const [showPosts, setShowPosts] = useState(false);

  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState("asc");
  const [currentAd, setCurrentAd] = useState({});

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
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="ProfileInfo">
        {(props) => <ProfilePage {...props} user={user} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name="ProfilePosts">
        {(props) => (
          <PostFeed {...props} ads={posts} setCurrentAd={setCurrentAd} />
        )}
      </Stack.Screen>
      <Stack.Screen name="SingleAd">
        {(props) => (
          <SingleAd
            {...props}
            ads={posts}
            currentAd={currentAd}
            onProfile={true}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );

  // <>
  //   <Button title="Posts" onPress={togglePosts} />
  //   {showPosts ? (
  //     <>
  //       <Button
  //         title={order === "desc" ? "Oldest first" : "Latest first"}
  //         onPress={toggleOrder}
  //       />
  //       <PostFeed ads={posts} />
  //     </>
  //   ) : (
  //     <>
  //       <View style={style.container}>
  //         <Text>User: {fullName}</Text>
  //         <Text>Display Name: {displayName}</Text>
  //         <Text>Email: {email}</Text>

  //         <Pressable
  //           onPress={() => {
  //             logoutHandler(setUser);
  //           }}
  //           style={style.logout}
  //         >
  //           <Text style={style.buttonText}>Logout</Text>
  //         </Pressable>
  //       </View>
  //     </>
  //   )}
  // </>
};

export default Profile;
