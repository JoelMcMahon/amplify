import { db, firebase } from "../../firebase/config";
import RequestLocationData from "../../utils/RequestLocationData";

export const uploadAd = async (
  setUploadingAd,
  title,
  body,
  media,
  setError,
  user,
  setUpdateMap,
  navigation
) => {
  //Checks if the title/body are adequate length. If not - changes error state and returns from function.
  if (title.length < 5 || body.length < 10) {
    setError(true);
    return;
  }

  setError(false);

  //Starts uploading ad.
  setUploadingAd(true);

  //Getting geolocation
  const { geohash, lat, long } = await RequestLocationData();

  //Setting up the endpoint for the data
  const endpoint = `/${media.type}/${Date.now()}`;

  //Setting a url variable for if there is media.
  let url = null;

  //If there's media - "blob" it and store it at the specified endpoint. Use getDownloadUrl to get the endpoint for the firestore.
  if (media.uri) {
    const uri = media.uri;
    const response = await fetch(uri);
    const blob = await response.blob();
    await firebase.storage().ref().child(endpoint).put(blob);
    url = await firebase.storage().ref(endpoint).getDownloadURL();
  }

  //Create and upload firestore object.
  const adObject = {
    displayName: user.displayName,
    title,
    body,
    type: media.type,
    url,
    geohash,
    lat,
    long,
    userId: user.id,
    created: firebase.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection("ads").add(adObject);

  setUpdateMap((currentArray) => [...currentArray, 1]);

  setUploadingAd(false);
  navigation.navigate("Home");
};
