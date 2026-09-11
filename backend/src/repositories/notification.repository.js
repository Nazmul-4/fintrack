const { db } = require('../config/firebase');

const COLLECTION = 'notifications';

const createNotification = async (data) => {
  const docRef = await db.collection(COLLECTION).add(data);
  return { id: docRef.id, ...data };
};

const getNotificationsByUser = async (userId) => {
  const snapshot = await db
    .collection(COLLECTION)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .limit(20)
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

module.exports = { createNotification, getNotificationsByUser };