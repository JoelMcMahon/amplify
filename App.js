import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens';
import { decode, encode } from 'base-64';
import { LogBox } from 'react-native';
import { userAppAuth } from './src/hooks/userAppAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './src/screens/Profile/Profile';
import NewPost from './src/screens/NewPost/NewPost';
import Chats from './src/screens/Chats/Chats';
import { navIcons } from './src/utils/navIcons';
import InboxScreen from './src/screens/InboxScreen/InboxScreen';
import useMessages from './src/Hooks/useMessages';
import useChats from './src/Hooks/useChats';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

LogBox.ignoreLogs(['Setting a timer']);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  LogBox.ignoreLogs([
    'Async Storage has been extracted from react-native core',
  ]);
  LogBox.ignoreLogs(['Setting a timer']);
  const { chatArray } = useChats();
  const { messagesArray } = useMessages(chatArray);


  const [location, setLocation] = useState(null);

  const { user, setUser, loading } = userAppAuth();

  const tabs = () => {
    return (
      <Tab.Navigator screenOptions={navIcons}>
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {(props) => <Profile {...props} user={user} setUser={setUser} />}
        </Tab.Screen>
        <Tab.Screen name="NewPost" component={NewPost} />
        <Tab.Screen name="Inbox">
          {(props) => <Inbox {...props} chatArray={chatArray} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  };

  const loginSignup = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen {...props} setUser={setUser} component={LoginScreen} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>{user ? tabs() : loginSignup()}</NavigationContainer>
  );
}
