import React, { useState } from 'react';
import Config from '../../Config';
import Login from './Login';
import Register from './Register';

function Auth({ setAuthenticated }) {
  const [msg, setMsg] = useState(Config.blankMsg);

  return (
    <div className="auth-page">
      <span className='auth-logo-text'>Shared Spaces</span>
      <p className='auth-page-msg'>{msg}</p>
      <Login setAuthenticated={setAuthenticated} setMsg={setMsg} />
      <br /><hr /><br />
      <Register setMsg={setMsg} />
      <br />
      <p className='disclaimer'>
        This is an educational project. Please don't put any confidential data in.<br />
        Especially passwords that you already use somewhere else, personal information,<br />
        photos and data that you don't want to lose.
      </p>
    </div >
  );
}

export default Auth;
