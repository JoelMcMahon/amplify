import { Camera } from "expo-camera";
import { useEffect, useState } from "react";

export const useCamera = () => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [mediaType, setMediaType] = useState("photo");

  const [hasPermission, setHasPermission] = useState(null);

  const askPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };
  useEffect(() => {
    askPermissions();
  }, []);

  const toggleType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const toggleMediaType = () => {
    setMediaType(mediaType === "photo" ? "video" : "photo");
  };

  return { type, toggleType, mediaType, toggleMediaType, hasPermission };
};
