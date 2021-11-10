import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";
import { LogBox } from "react-native";
import { userAppAuth } from "./src/Hooks/userAppAuth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./src/screens/Profile/Profile";
import { navIcons } from "./src/utils/navIcons";
import useMessages from "./src/Hooks/useMessages";
import useChats from "./src/Hooks/useChats";
import NewPostNav from "./src/screens/NewPost/NewPost";
import Inbox from "./src/screens/InboxScreen/InboxScreen";
import fetchUsers from "./src/Hooks/fetchUsers";
import { testChat } from "./src/Hooks/testChats";
import { Provider as PaperProvider } from 'react-native-paper';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["Async Storage has been extracted from react-native core"]);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = userAppAuth();

  const { usersArray, chatArray, messagesObject } = testChat(user);

  const tabs = () => {
    return (
      <Tab.Navigator screenOptions={navIcons} tabBarHideOnKeyboard={true}>
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {(props) => (
            <Profile
              {...props}
              user={user}
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="NewPost">
          {(props) => <NewPostNav {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Inbox">
          {(props) => (
            <Inbox
              {...props}
              chatArray={chatArray}
              usersArray={usersArray}
              user={user}
              messagesObject={messagesObject}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    );
  };

  const loginSignup = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen
              {...props}
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Registration">
          {(props) => (
            <RegistrationScreen
              {...props}
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  };

  return (
    <PaperProvider>
    <NavigationContainer>
      {isLoggedIn ? tabs() : loginSignup()}
    </NavigationContainer>
    </PaperProvider>
  );
}
