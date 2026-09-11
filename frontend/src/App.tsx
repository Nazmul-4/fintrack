import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import api from './services/api';

function App() {
  const { currentUser, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [profile, setProfile] = useState<unknown>(null);

  const fetchProfile = async () => {
    const res = await api.get('/api/users/profile');
    setProfile(res.data.data);
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

      {profile !== null && (
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;