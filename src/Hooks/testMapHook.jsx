import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const geofire = require("geofire-common");
import { db } from "../firebase/config";

export const useMap = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAds = async () => {
      setLoading(true);
      const {
        coords: { latitude, longitude },
      } = await JSON.parse(await AsyncStorage.getItem("lastKnownPosition"));

      const bounds = geofire.geohashQueryBounds(
        [latitude, longitude],
        10 * 1000
      );
      const center = [latitude, longitude];

      const adsPromises = [];

      for (let i = 0; i < bounds.length; i++) {
        const [start, end] = bounds[i];
        const promises = db
          .collection("ads")
          .orderBy("geohash")
          .startAt(start)
          .endAt(end);
        adsPromises.push(promises.get());
      }

      Promise.all(adsPromises)
        .then(async (snapshots) => {
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
  }, []);

  return { ads, loading };
};
