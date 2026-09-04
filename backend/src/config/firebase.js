const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

// Load secret service account key
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccount),
});

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { db, auth };