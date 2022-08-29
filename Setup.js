import React from 'react';
import App from './App';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDlWMspsiETSVjOCL0CSkrGwFTe5FvYvlo",
  authDomain: "canco-convrtx.firebaseapp.com",
  projectId: "canco-convrtx",
  storageBucket: "canco-convrtx.appspot.com",
  messagingSenderId: "664328630456",
  appId: "1:664328630456:web:5b4deafec555d82a3d444d",
  measurementId: "G-FKTBRZWEEG"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase, messaging }
const Setup = () => {

  const setupCloudMessaging = async () => {
    messaging().subscribeToTopic('PromotionNotifications')
  }

  React.useEffect(async () => {
    setupCloudMessaging()
    firebase.auth().signInAnonymously()
  }, []);

  return <App />
}

export default Setup;
















