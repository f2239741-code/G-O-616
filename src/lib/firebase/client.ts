/**
 * Firebase Client Configuration & Safe Lazy Initializer
 */

export interface FirebaseAppConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: typeof process !== 'undefined' ? process.env?.VITE_FIREBASE_API_KEY : '',
  authDomain: 'guardian-oracle.firebaseapp.com',
  projectId: 'guardian-oracle-prod',
  storageBucket: 'guardian-oracle-prod.appspot.com',
  messagingSenderId: '1092837465',
  appId: '1:1092837465:web:8a9b2c3d4e5f6a7b'
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey);
