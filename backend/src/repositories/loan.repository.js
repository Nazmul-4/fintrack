const { db } = require('../config/firebase');

const COLLECTION = 'loans';

const createLoan = async (data) => {
  const docRef = await db.collection(COLLECTION).add(data);
  return { id: docRef.id, ...data };
};

const getLoanById = async (loanId) => {
  const doc = await db.collection(COLLECTION).doc(loanId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

const getLoansByUser = async (userId) => {
  const snapshot = await db
    .collection(COLLECTION)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const getLoansByStatus = async (status) => {
  const snapshot = await db
    .collection(COLLECTION)
    .where('status', '==', status)
    .orderBy('createdAt', 'desc')
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const updateLoan = async (loanId, updates) => {
  await db.collection(COLLECTION).doc(loanId).update(updates);
  return getLoanById(loanId);
};

module.exports = {
  createLoan,
  getLoanById,
  getLoansByUser,
  getLoansByStatus,
  updateLoan,
};