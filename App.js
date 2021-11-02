import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";
import { LogBox } from "react-native";
import { userAppAuth } from "./src/hooks/userAppAuth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./src/screens/Profile/Profile";
import NewPost from "./src/screens/NewPost/NewPost";
import Chats from "./src/screens/Chats/Chats";
import { navIcons } from "./src/utils/navIcons";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

LogBox.ignoreLogs(["Setting a timer"]);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  LogBox.ignoreLogs(['Async Storage has been extracted from react-native core']);
  LogBox.ignoreLogs(['Setting a timer']);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [location,setLocation] =useState(null);

  const { user, setUser, loading } = userAppAuth();

  const tabs = () => {
    return (
      <Tab.Navigator screenOptions={navIcons}>
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} user={user} setUser={setUser} />}
        </Tab.Screen>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="NewPost" component={NewPost} />
        <Tab.Screen name="Chats" component={Chats} />
      </Tab.Navigator>
    );
  };

  const loginSignup = () => {
    return (
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Hello Celina">
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Location">
              {(props) => <LocationScreen {...props} location={location} setLocation={setLocation} extraData={user} component={LocationScreen} />}
            </Stack.Screen>
            <Stack.Screen name="Map">
              {(props) => <MapScreen {...props} extraData={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen
                  {...props}
                  setUser={setUser}
                  component={LoginScreen}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
        
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>{user ? tabs() : loginSignup()}</NavigationContainer>
  );
}
