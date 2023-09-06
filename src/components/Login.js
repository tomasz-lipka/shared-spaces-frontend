import React, { useState } from 'react';

const Login = ({setAuthenticated}) => {

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const handleLogin = async () => {

    try {
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
       
        console.log('asdasdasd')
        setAuthenticated(true)

      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Login2</h2>
      <div>
        <label htmlFor="login">Login:</label>
        <input
          type="text"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;