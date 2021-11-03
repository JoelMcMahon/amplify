import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import useMarkers from '../../Hooks/useMarkers';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RequestLocationData from '../../utils/RequestLocationData';
import ListScreen from '../ListScreen/ListScreen';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function MapScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { markerArray, lastLocation } = useMarkers();
  useEffect(() => {
    setIsLoading(false);
  }, []);


  const [region, setRegion] = useState({
    latitude: 54.99978401844755,
    latitudeDelta: 0.01,
    longitude: -2.664258929807359,
    longitudeDelta: 0.01,
  });

  // const generalRegion = {
  //   latitude: 54.99978401844755,
  //   latitudeDelta: 0.01,
  //   longitude: -2.664258929807359,
  //   longitudeDelta: 0.01,
  // };

  console.log(markerArray, 'marker in map');
  const initRegion = {
    latitude: lastLocation.latitude,
    latitudeDelta: 0.008,
    longitude: lastLocation.longitude,
    longitudeDelta: 0.0008,
  };
 
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
        query={{
          key: 'GOOGLE_API_KEY',
          language: 'en',
          components: 'country:us',
          types: 'establishment',
          radius: 30000,
          location: `${initRegion.latitude}, ${initRegion.longitude}`,
        }}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            width: '100%',
            zIndex: 1000,
          },
          listView: { backgroundColor: 'white' },
        }}
      />
      <MapView
        style={styles.map}
        region={isLoading ? region : initRegion}
        provider="google"
      >
        {markerArray.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={{ latitude: marker.lat, longitude: marker.long }}
            >
              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.title}>Add title</Text>
                    <Text>
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={{
                          uri: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                        }}
                      />
                    </Text>
                    <Text>A short description...</Text>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <TouchableOpacity
        onPress={() => {
          RequestLocationData();
        }}
      >
        <Text>Set Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: 20,
    height: 20,
  },
});
