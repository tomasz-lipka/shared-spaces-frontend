import React, { useState } from 'react';

function Login({ setAuthenticated }) {

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setError] = useState('');

  const handleLogin = async () => {

    const response = await fetch('https://tomasz-lipka-scaling-palm-tree-x9p56pvw9wr2jp7-5000.app.github.dev/login', {
      method: 'POST',
      body: JSON.stringify({ login, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("access_token", data.access_token);
      setAuthenticated(true)
    } else {
      const errorMessage = await response.text();
      setError(errorMessage); <h2>await response.text()</h2>
    }
  };

  return (
    <div className="App">
      <h2>Login</h2>
      <div>
        <label htmlFor="login">Login: </label>
        <input
          type="text"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Login;