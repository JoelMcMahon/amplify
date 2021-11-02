

import * as Location from 'expo-location';
import { firebase } from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default requestLocationPermission = async () => {
     
    
    const geofire = require('geofire-common');
  
    
  
    const storageRef = firebase.firestore().collection('ads');
  
    try {
      const granted = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        const currLocation = await Location.getCurrentPositionAsync({requiredAccuracy : 1});
       const stringedLocation = JSON.stringify(currLocation)
        await AsyncStorage.setItem('lastKnownPosition', stringedLocation)
  
        function getRandomInt() {
         const min = -.002;
         const max = .002;
          return Math.random() * (max - min) + min;
        }
        
        const lat = currLocation.coords.latitude + (getRandomInt());
        const long = currLocation.coords.longitude + (getRandomInt());
        const hash = geofire.geohashForLocation([lat, long]);
        const data = { geohash: hash, lat, long };
        // storageRef.add(data);

        // return data
        
        
      }
    } catch (error) {
      alert(error);
    }
  };