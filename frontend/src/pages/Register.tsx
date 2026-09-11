import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // Step 1: Create the Firebase Auth account
      await register(email, password);

      // Step 2: Tell our backend to create a Firestore profile for this user
      await api.post('/api/users/create-profile', { fullName, phone });

      alert('Registered successfully!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;