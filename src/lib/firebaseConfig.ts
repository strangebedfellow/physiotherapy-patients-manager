import type { FirebaseOptions } from 'firebase/app'

const env = import.meta.env

export const firebaseConfig: FirebaseOptions = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  databaseURL: env.VITE_FIREBASE_DATABASE_URL,
}

// Minimum potrzebne do logowania (Auth) i bazy (Realtime Database).
const required = {
  VITE_FIREBASE_API_KEY: firebaseConfig.apiKey,
  VITE_FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain,
  VITE_FIREBASE_PROJECT_ID: firebaseConfig.projectId,
  VITE_FIREBASE_APP_ID: firebaseConfig.appId,
  VITE_FIREBASE_DATABASE_URL: firebaseConfig.databaseURL,
}

export const missingFirebaseEnv = Object.entries(required)
  .filter(([, value]) => !value)
  .map(([name]) => name)
