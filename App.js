import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import { Camera, useCameraDevices } from "react-native-vision-camera";

function App() {
  const devices = useCameraDevices('wide-angle-camera')
  const device = devices.back
  const [ isActive, setIsActive ] = useState(false)

  useEffect(() => {
    requestCameraPermission()
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsActive(true)
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  if (device == null) return null
  return (
    <Camera
      device={ device }
      isActive={ isActive }
      style={ {
        flex: 1
      } }
    />
  )
}


export default App;
