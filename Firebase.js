import { createStore, compose } from 'redux';

import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain.firebaseapp.com",
  databaseURL: "https://databaseURL.firebaseio.com",
  projectId: "projectId",
  storageBucket: "storageBucket.appspot.com",
  messagingSenderId: "messagingSenderId"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true
};


firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
)(createStore);

export { createStoreWithFirebase };
