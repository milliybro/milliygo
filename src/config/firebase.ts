import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB90EHd0x7VfsFSVktSzvCJhLKCsyJdC5E',
  authDomain: 'myuzbekistan-34339.firebaseapp.com',
  projectId: 'myuzbekistan-34339',
  storageBucket: 'myuzbekistan-34339.firebasestorage.app',
  messagingSenderId: '598826341312',
  appId: '1:598826341312:web:5aabe88821049183b7ee25',
  measurementId: 'G-BQ722RHN69',
}

const apps = getApps()
const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig)
export const auth = getAuth(app)
