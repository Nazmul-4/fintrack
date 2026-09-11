const { db } = require('../config/firebase');

const COLLECTION = 'transactions';

const createTransaction = async (data) => {
  const docRef = await db.collection(COLLECTION).add(data);
  return { id: docRef.id, ...data };
};

const getTransactionsByUser = async (userId) => {
  const snapshot = await db
    .collection(COLLECTION)
    .where('userId', '==', userId)
    .orderBy('date', 'desc')
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

module.exports = { createTransaction, getTransactionsByUser };