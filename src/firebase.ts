import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDrqEnyBJk9A18gwhaEatUAwY6K4O4rqwg',
  authDomain: 'ojou-jounal.firebaseapp.com',
  projectId: 'ojou-jounal',
  storageBucket: 'ojou-jounal.appspot.com',
  messagingSenderId: '167287675906',
  appId: '1:167287675906:web:4d0948baede2edf9af5b1b',
  measurementId: 'G-8ZVLV883SR',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
