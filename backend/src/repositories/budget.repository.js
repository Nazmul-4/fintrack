const { db } = require('../config/firebase');

const COLLECTION = 'budgets';

const createBudget = async (data) => {
  const docRef = await db.collection(COLLECTION).add(data);
  return { id: docRef.id, ...data };
};

const getBudgetByUserAndMonth = async (userId, month) => {
  const snapshot = await db
    .collection(COLLECTION)
    .where('userId', '==', userId)
    .where('month', '==', month)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

module.exports = { createBudget, getBudgetByUserAndMonth };