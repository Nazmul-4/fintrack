import { useEffect, useState } from 'react';
import { auth } from './config/firebase';

function App() {
  const [status, setStatus] = useState('Checking Firebase...');

  useEffect(() => {
    if (auth) {
      setStatus('✅ Firebase connected successfully!');
    }
  }, []);

  return (
    <div>
      <h1>FinTrack 🚀</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;