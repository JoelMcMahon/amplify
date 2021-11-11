import React, { useState } from "react";
import { Text, View } from "react-native";
import MapScreen from "./MapScreen";
import PostFeed from "../PostFeed/PostFeed";
import { useMap } from "../../Hooks/useMarkers";

import { createStackNavigator } from "@react-navigation/stack";
import SingleAd from "../SingleAd/SingleAd";
import OtherUser from "../OtherUser/OtherUser";
import Chats from "../Chats/Chats";

const Stack = createStackNavigator();

export default function HomeScreen({ navigation, updateMap }) {
  const [currentAd, setCurrentAd] = useState({});
  const [otherUser, setOtherUser] = useState("");
  const { ads, loading, lastLocation } = useMap(updateMap);

  if (loading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  const navToAd = (ad) => {
    setCurrentAd(ad);
    navigation.navigate("SingleHomeAd", { currentUser });
  };

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="Map">
        {(props) => (
          <MapScreen
            {...props}
            ads={ads}
            lastLocation={lastLocation}
            navToAd={navToAd}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="HomePosts">
        {(props) => (
          <PostFeed {...props} ads={ads} mainList={true} navToAd={navToAd} />
        )}
      </Stack.Screen>
      <Stack.Screen name="SingleHomeAd">
        {(props) => (
          <SingleAd
            {...props}
            currentAd={currentAd}
            navigation={navigation}
            setOtherUser={setOtherUser}
            currentUser={currentUser}
            chatArray={chatArray}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="OtherUser">
        {(props) => <OtherUser {...props} userId={otherUser} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
