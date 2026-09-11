// user.repository.js — Direct Firestore operations for the 'users' collection

const { db } = require('../config/firebase');

const USERS_COLLECTION = 'users';

const createUserProfile = async (uid, data) => {
  await db.collection(USERS_COLLECTION).doc(uid).set(data);
  return { uid, ...data };
};

const getUserProfile = async (uid) => {
  const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
  if (!doc.exists) return null;
  return { uid: doc.id, ...doc.data() };
};

module.exports = { createUserProfile, getUserProfile };