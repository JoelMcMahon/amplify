
import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useState } from 'react';
import MapScreen from '../MapScreen/MapScreen';
import ListScreen from '../ListScreen/ListScreen';
import RequestLocationData from '../../utils/RequestLocationData';
import { firebase } from "../../firebase/config";

export default function HomeScreen(props) {
  const [viewToggle, setViewToggle] = useState('map');

  export default function HomeScreen({ user, setUser }) {
  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        console.log(res);

        setUser(null);
      })
      .catch((err) => console.dir(err));
  };

  return (
    <View style={styles.container}>
      <Button title="Map" onPress={()=> setViewToggle('map')}></Button>
      <Button title="List" onPress={()=> setViewToggle('list')}></Button>
      {viewToggle === 'map'&& <MapScreen/>} 
      {viewToggle === 'list'&& <ListScreen/>} 

    </View>
  );
}
