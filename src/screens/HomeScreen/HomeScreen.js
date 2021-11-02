import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useState } from 'react';

import MapScreen from '../MapScreen/MapScreen';
import ListScreen from '../ListScreen/ListScreen';

import RequestLocationData from '../../utils/RequestLocationData';

export default function HomeScreen(props) {
  const [viewToggle, setViewToggle] = useState('map');

  return (
    <View style={styles.container}>
      <Button title="Map" onPress={()=> setViewToggle('map')}></Button>
      <Button title="List" onPress={()=> setViewToggle('list')}></Button>
      {viewToggle === 'map'&& <MapScreen/>} 
      {viewToggle === 'list'&& <ListScreen/>} 
    </View>
  );
}
