import { firebase, db } from "../../firebase/config";
import RequestLocationData from "../../utils/RequestLocationData";

export const uploadAd = async (setUploadingAd, title, body, media) => {
  setUploadingAd(true);
  const { geohash, lat, long } = await RequestLocationData();
  const uid = await firebase.auth().currentUser.uid;
  const adObject = {
    title,
    body,
    type: media.type,
    uri: media.uri,
    geohash,
    lat,
    long,
    userId: uid,
  };
  console.log(adObject);
  setUploadingAd(false);
};
