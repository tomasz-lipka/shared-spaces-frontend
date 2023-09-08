import React, { useState } from 'react';
import config from '../config';

function Auth({ setAuthenticated }) {
  const [login, setLogin] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [registerLogin, setRegisterLogin] = useState('');
  const [registerPwd, setRegisterPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [registerErrMsg, setRegisterErrMsg] = useState('');
 

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
      setErrMsg(errorMessage);
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    const response = await fetch(config.apiUrl + '/register', {
      method: 'POST',
      body: `{
        "login": "${registerLogin}",
        "password": "${registerPwd}",
        "confirm-password": "${confirmPwd}"
      }`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const msg = await response.text();
      alert(msg)
    } else {
      const errorMessage = await response.text();
      setRegisterErrMsg(errorMessage);
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
          onKeyUp={handleKeyUp}
        />
      </div>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p>{errMsg}</p>

      <br></br>
      <h3>or</h3>
      <br></br>

      <h2>Register</h2>
      <div>
        <label htmlFor="login">Login: </label>
        <input
          type="text"
          value={registerLogin}
          onChange={(e) => setRegisterLogin(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={registerPwd}
          onChange={(e) => setRegisterPwd(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password: </label>
        <input
          type="password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      <p>{registerErrMsg}</p>
    </div>
  );
}

export default Auth;
