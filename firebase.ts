// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAw4Tkm3n-V7w4CAQnhu8Hp4_ehUJT9wRI',
  authDomain: 'onlineanketim.firebaseapp.com',
  projectId: 'onlineanketim',
  storageBucket: 'onlineanketim.appspot.com',
  messagingSenderId: '951682860260',
  appId: '1:951682860260:web:c8ded19bb1333a83ac98f1',
  measurementId: 'G-VZM6DEPC3V',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);
export default app;
