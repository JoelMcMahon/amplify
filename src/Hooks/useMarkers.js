import React, { useState, useEffect } from "react";
import { Marker, Callout, View, Text } from "react-native-maps";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
const geofire = require("geofire-common");
import { StyleSheet } from "react-native";

export default function useMarkers(setIsLoading) {
  const [mapToggle, setMapToggle] = useState(true);
  const [markerArray, setMarkerArray] = useState([]);
  const [lastLocation, setLastLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const db = firebase.firestore();

  requestLocationPermission();
  const retrieveMarkers = async () => {
    const lastPosition = await JSON.parse(
      await AsyncStorage.getItem("lastKnownPosition")
    );
    // console.log(lastPosition, "mapview");
    const lastLat = lastPosition.coords.latitude;
    const lastLong = lastPosition.coords.longitude;
    const center = [lastLat, lastLong];
    const radiusInM = 10 * 1000;
    setLastLocation({ latitude: lastLat, longitude: lastLong });

    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
      const q = db
        .collection("ads")
        .orderBy("geohash")
        .startAt(b[0])
        .endAt(b[1]);
      promises.push(q.get());
    }

    Promise.all(promises)
      .then((snapshots) => {
        const matchingDocs = [];

        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.get("lat");
            const long = doc.get("long");

            const distanceInKm = geofire.distanceBetween([lat, long], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
              matchingDocs.push(doc);
            }
          }
        }

        return matchingDocs;
      })
      .then((matchingDocs) => {
        // console.log(matchingDocs, "then");

        const markerCoords = matchingDocs.map((docs) => {
          const lat =
            docs._delegate._document.data.value.mapValue.fields.lat.doubleValue;
          const long =
            docs._delegate._document.data.value.mapValue.fields.long
              .doubleValue;
          return { lat, long };
        });

        setMarkerArray(markerCoords);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    retrieveMarkers();
  }, []);

  return { markerArray, mapToggle, setMapToggle, lastLocation };
}
