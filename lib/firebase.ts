import { initializeApp, getApps, getApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// No config needed here for native setup if google-services.json is present.
// For Expo Go (if used) or web, we might need JS config.
// However, @react-native-firebase is a native library.
// If using Expo, we should use the native config via google-services.json

// Check if app is already initialized
const app = getApps().length === 0 ? initializeApp() : getApp();

const firebaseAuth = auth();

export { app, firebaseAuth };
