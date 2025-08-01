import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  const requiredEnvVars = [
    import.meta.env.VITE_FIREBASE_API_KEY,
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    import.meta.env.VITE_FIREBASE_PROJECT_ID,
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    import.meta.env.VITE_FIREBASE_APP_ID
  ];
  
  return requiredEnvVars.every(envVar => envVar && envVar !== 'undefined' && envVar !== '');
};

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1YPpvErdlMlWoYMat1L0rxmvsqqVIdtY",
  authDomain: "cab-i-net-87713.firebaseapp.com", // Keep this as the main auth domain
  projectId: "cab-i-net-87713",
  storageBucket: "cab-i-net-87713.firebasestorage.app",
  messagingSenderId: "169349902043",
  appId: "1:169349902043:web:8fc2fd21afdd8f16c1e6fe",
  measurementId: "G-V2JDVWRYXS"
};

// Initialize Firebase only if properly configured
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

// Always initialize Firebase since we have fallback config
try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase Authentication and get a reference to the service
  auth = getAuth(app);
  
  // Set custom auth domain for Netlify deployments
  const currentDomain = window.location.hostname;
  if (currentDomain.includes('netlify.app') && !currentDomain.includes('firebaseapp.com')) {
    // For Netlify deployments, we need to handle auth differently
    console.log('🔧 Netlify deployment detected, using Firebase auth domain:', firebaseConfig.authDomain);
  }
  
  // Initialize Firestore
  db = getFirestore(app);
  
  // Initialize analytics (only in browser)
  if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
    try {
      getAnalytics(app);
      console.log('Firebase Analytics initialized');
    } catch (e) {
      // Analytics might fail in some environments (SSR, etc.)
      console.log('Analytics not initialized:', e);
    }
  }
  
  // Connect to Firebase emulators ONLY in local development
  const isLocalDevelopment = import.meta.env.DEV &&
                             import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true' &&
                             window.location.hostname === 'localhost';

  if (isLocalDevelopment && !auth.app.options.projectId?.includes('demo')) {
    // Only connect to Auth emulator if explicitly enabled and running locally
    try {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      // connectFirestoreEmulator(db, '127.0.0.1', 8080); // DISABLED
      console.log('Connected to Firebase Auth emulator');
    } catch (error) {
      // Emulators already connected or not available
      console.log('Firebase emulators not connected:', error);
    }
  } else {
    console.log('Using production Firebase services');
  }
  
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  app = null;
  auth = null;
  db = null;
}

// Custom auth functions that handle domain issues
const customAuth = {
  // Demo login that bypasses Firebase auth domain issues
  demoLogin: async () => {
    try {
      // Create a demo user session without Firebase auth
      const demoUser = {
        uid: 'demo-user-123',
        email: 'demo@cabinet.com',
        displayName: 'Demo User',
        photoURL: null,
        isDemo: true
      };
      
      // Store demo user in localStorage
      localStorage.setItem('demoUser', JSON.stringify(demoUser));
      
      console.log('✅ Demo login successful');
      return demoUser;
    } catch (error) {
      console.error('Demo login failed:', error);
      throw error;
    }
  },

  // Demo logout
  demoLogout: async () => {
    try {
      localStorage.removeItem('demoUser');
      console.log('✅ Demo logout successful');
    } catch (error) {
      console.error('Demo logout failed:', error);
      throw error;
    }
  },

  // Check if user is logged in (demo or real)
  getCurrentUser: () => {
    if (auth?.currentUser) {
      return auth.currentUser;
    }
    
    const demoUser = localStorage.getItem('demoUser');
    if (demoUser) {
      return JSON.parse(demoUser);
    }
    
    return null;
  },

  // Auth state listener that includes demo users
  onAuthStateChanged: (callback: (user: any) => void) => {
    if (auth) {
      return onAuthStateChanged(auth, callback);
    } else {
      // Fallback for demo mode
      const demoUser = localStorage.getItem('demoUser');
      callback(demoUser ? JSON.parse(demoUser) : null);
      return () => {};
    }
  }
};

// Export with null checks
export { auth, db, isFirebaseConfigured, customAuth };
export default app;
