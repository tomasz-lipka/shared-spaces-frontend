import React, { useState } from 'react';
import Config from '../../Config';
import Login from './Login';

function Auth({ setAuthenticated }) {

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const [registerLogin, setRegisterLogin] = useState('');
  const [registerPwd, setRegisterPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [registerMsg, setRegisterMsg] = useState('');


  async function handleRegister() {
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

  return (
    <div className="auth-page">
      <span className='auth-logo-text'>Shared Spaces</span>
      <p>{msg}</p>
      <br></br>

      <Login setAuthenticated={setAuthenticated} setMsg={setMsg} />

      <br></br>
      <h3>or</h3>
      <br></br>

      <div>
        <label>Login: </label>
        <input
          className='auth-input'
          type="text"
          value={registerLogin}
          onChange={(e) => setRegisterLogin(e.target.value)}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          className='auth-input'
          type="password"
          value={registerPwd}
          onChange={(e) => setRegisterPwd(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm password: </label>
        <input
          className='auth-input'
          type="password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      <p>{registerMsg}</p>

      <p>
        This is an educational project. Please don't put any confidential data.
        Especially password that you already use somewhere else, personal information, photos and
        other data that you don't want to loose.
      </p>
    </div >
  );
}

export default Auth;
