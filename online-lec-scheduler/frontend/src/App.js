// App.js

import React, { useState } from 'react';
import AdminPanel from './AdminPanel';
import InstructorPanel from './InstructorPanel';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'Admin' && password === 'adminpass') {
      setIsLoggedIn(true); // Admin logged in
    } else if (username === 'User' && password === 'userpass') {
      setIsLoggedIn(true); // Instructor logged in
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='mt-20'>
      {!isLoggedIn ? (
        <div className="max-w-md mx-auto text-center p-4 border border-gray-300 rounded-lg border-2">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="px-4 py-2 rounded border border-gray-300 mb-2" /> <br />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-4 py-2 rounded border border-gray-300 mb-2" /> <br />
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
          {error && <p>{error}</p>}
        </div>
      ) : (
        <div>
          {username === 'Admin' && password === 'adminpass'? (
            <AdminPanel />
          ) : (
            <InstructorPanel />
          )}
        </div>
      )}
    </div>
  );
  
};

export default App;
