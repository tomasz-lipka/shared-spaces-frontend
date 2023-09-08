import React, { useState } from 'react';
import config from '../config';

function Auth({ setAuthenticated }) {
  const [login, setLogin] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);

    const response = await fetch(config.apiUrl + '/login', {
      method: 'POST',
      body: `{
        "login": "${login}",
        "password": "${pwd}"
      }`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem('access_token', data.access_token);
      setAuthenticated(true);
    } else {
      const errorMessage = await response.text();
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="App">
      <h2>Login</h2>
      <div>
        <label htmlFor="login">Login: </label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onKeyUp={handleKeyUp} // Handle Enter key press
        />
      </div>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p>{errorMessage}</p>
    </div>
  );
}

export default Auth;
