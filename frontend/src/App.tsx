import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import api from './services/api';

import { db } from './config/firebase';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const { currentUser, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [profile, setProfile] = useState<unknown>(null);

  const fetchProfile = async () => {
    const res = await api.get('/api/users/profile');
    setProfile(res.data.data);
  };

  // TEMPORARY TEST:
  // Try to access Firestore directly from the frontend.
  const testDirectFirestoreAccess = async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));

      alert(
        `⚠️ SECURITY ISSUE: Got ${snap.docs.length} docs directly!`
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`✅ Blocked as expected: ${err.message}`);
      } else {
        alert('✅ Blocked as expected: Missing or insufficient permissions.');
      }
    }
  };

  if (!currentUser) {
    return (
      <div>
        {showRegister ? <Register /> : <Login />}

        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? 'Go to Login' : 'Go to Register'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>FinTrack 🚀</h1>

      <p>Logged in as: {currentUser.email}</p>

      <button onClick={logout}>Logout</button>

      <button
        onClick={async () => {
          const res = await api.get('/api/admin/test');
          alert(res.data.message);
        }}
      >
        Test Admin Access
      </button>

      <hr />

      <button onClick={fetchProfile}>
        Fetch My Profile (Protected Route Test)
      </button>

      <hr />

      <button onClick={testDirectFirestoreAccess}>
        Test Direct Firestore Access
      </button>

      {profile !== null && (
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;