import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase/config";

const geofire = require("geofire-common");

export const useMap = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastLocation, setLastLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
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

  return { ads, loading, lastLocation };
};

// export default function useMarkers(setIsLoading) {
//   const [mapToggle, setMapToggle] = useState(true);
//   const [markerArray, setMarkerArray] = useState([]);
//   const [lastLocation, setLastLocation] = useState({
//     latitude: 0,
//     longitude: 0,
//   });

//   const db = firebase.firestore();

//   requestLocationPermission();
//   const retrieveMarkers = async () => {
//     const lastPosition = await JSON.parse(
//       await AsyncStorage.getItem("lastKnownPosition")
//     );
//     const lastLat = lastPosition.coords.adslatitude;
//     const lastLong = lastPosition.coords.longitude;
//     const center = [lastLat, lastLong];
//     const radiusInM = 10 * 1000;
//     setLastLocation({ latitude: lastLat, longitude: lastLong });

//     const bounds = geofire.geohashQueryBounds(center, radiusInM);
//     const promises = [];
//     for (const b of bounds) {
//       const q = db
//         .collection("ads")
//         .orderBy("geohash")
//         .startAt(b[0])
//         .endAt(b[1]);
//       promises.push(q.get());
//     }

//     Promise.all(promises)
//       .then((snapshots) => {
//         const matchingDocs = [];

//         for (const snap of snapshots) {
//           for (const doc of snap.docs) {
//             const lat = doc.get("lat");
//             const long = doc.get("long");

//             const distanceInKm = geofire.distanceBetween([lat, long], center);
//             const distanceInM = distanceInKm * 1000;
//             if (distanceInM <= radiusInM) {
//               matchingDocs.push(doc);
//             }
//           }
//         }

//         return matchingDocs;
//       })
//       .then((matchingDocs) => {

//         const markerCoords = matchingDocs.map((docs) => {
//           const lat =
//             docs._delegate._document.data.value.mapValue.fields.lat.doubleValue;
//           const long =
//             docs._delegate._document.data.value.mapValue.fields.long
//               .doubleValue;
//           return { lat, long };
//         });

//         setMarkerArray(markerCoords);
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   };

//   useEffect(() => {
//     retrieveMarkers();
//   }, []);

//   return { markerArray, mapToggle, setMapToggle, lastLocation };
// }
