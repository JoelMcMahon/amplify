import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  LocationScreen,
  MapScreen
} from './src/screens';
import { decode, encode } from 'base-64';
import { firebase } from './src/firebase/config';
// import RNLocation from 'react-native-location';
import { LogBox } from 'react-native';
import _ from 'lodash';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Async Storage has been extracted from react-native core']);
  LogBox.ignoreLogs(['Setting a timer']);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [location,setLocation] =useState(null);

  // if (loading) {
  //   return (
  //     <></>
  //   )
  // }

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
