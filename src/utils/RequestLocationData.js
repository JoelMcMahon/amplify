

import * as Location from 'expo-location';
import { firebase } from '../../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default requestLocationPermission = async () => {
     
    
    const geofire = require('geofire-common');
  
    
  
    // const storageRef = firebase.firestore().collection('ads');
  
    try {
      const granted = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        const currLocation = await Location.getCurrentPositionAsync({requiredAccuracy : 1});
       const stringedLocation = JSON.stringify(currLocation)
        await AsyncStorage.setItem('lastKnownPosition', stringedLocation)
  
       
        const lat = currLocation.coords.latitude + ((Math.random() * 0.0005) + 0.001);
        const long = currLocation.coords.longitude + ((Math.random() * 0.0005) + 0.001);
        const hash = geofire.geohashForLocation([lat, long]);
        const data = { geohash: hash, lat, long };
        // storageRef.add(data);

        return data
        
        
      }
    } catch (error) {
      alert(error);
    }
  };