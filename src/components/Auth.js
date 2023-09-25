import React, { useState } from 'react';
import Config from '../Config';

function Auth({ setAuthenticated }) {
  const [login, setLogin] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const [registerLogin, setRegisterLogin] = useState('');
  const [registerPwd, setRegisterPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [registerMsg, setRegisterMsg] = useState('');


  const handleLogin = async () => {
    setMsg('')
    setRegisterMsg('')
    setLoading(true);

    const response = await fetch(Config.apiUrl + '/login', {
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
      sessionStorage.setItem('currentUser', login);
      setAuthenticated(true);
    } else {
      const errorMessage = await response.text();
      setMsg(errorMessage);
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setMsg('')
    setRegisterMsg('')
    const response = await fetch(Config.apiUrl + '/register', {
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
      setRegisterMsg(msg)
    } else {
      const errorMessage = await response.text();
      setRegisterMsg(errorMessage);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="App">
      <h1><u>Shared Spaces</u></h1>
      <br></br>

      <h2>Login</h2>
      <div>
        <label>Login: </label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div>
        <label>Password: </label>
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
      <p>{msg}</p>

      <br></br>
      <h3>or</h3>
      <br></br>

      <h2>Register</h2>
      <div>
        <label>Login: </label>
        <input
          type="text"
          value={registerLogin}
          onChange={(e) => setRegisterLogin(e.target.value)}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={registerPwd}
          onChange={(e) => setRegisterPwd(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </div>
      <div>
        <label>Confirm password: </label>
        <input
          type="password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      <p>{registerMsg}</p>
      <p>
        This is an educational project. Please don't put any confidential data
        (especially password that you already use somewhere else) and other information that you don't want to loose.
      </p>
    </div >
  );
}

export default Auth;
