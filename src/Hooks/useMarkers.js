import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase/config";
import RequestLocationData from "../utils/RequestLocationData";

const geofire = require("geofire-common");

export const useMap = (updateMap) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastLocation, setLastLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    RequestLocationData();
    const getAds = async () => {
      setLoading(true);
      const {
        coords: { latitude, longitude },
      } = await JSON.parse(await AsyncStorage.getItem("lastKnownPosition"));
      const object = await JSON.parse(
        await AsyncStorage.getItem("lastKnownPosition")
      );
      const bounds = geofire.geohashQueryBounds(
        [latitude, longitude],
        10 * 1000
      );

      const center = [latitude, longitude];
      setLastLocation({ latitude, longitude });

      Promise.all(
        bounds.map(([start, end]) => {
          const boundPromise = db
            .collection("ads")
            .orderBy("geohash")
            .startAt(start)
            .endAt(end);
          return boundPromise.get();
        })
      )
        .then((snapshots) => {
          const matchingDocs = [];

          for (const snap of snapshots) {
            for (const doc of snap.docs) {
              const { lat, long } = doc.data();

              const distanceInKm = geofire.distanceBetween([lat, long], center);
              const distanceInM = distanceInKm * 1000;
              if (distanceInM <= 10 * 1000) {
                matchingDocs.push(doc);
              }
            }
          }
          return matchingDocs;
        })
        .then((docs) => {
          return docs.map((doc) => doc.data());
        })
        .then((ads) => {
          setAds(ads);
          setLoading(false);
        });
    };

    getAds();
  }, [updateMap]);

  return { ads, loading, lastLocation };
};
