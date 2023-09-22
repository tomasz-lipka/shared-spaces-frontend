import React, { useState, useEffect } from 'react';
import Spaces from "./Spaces";
import EditPwd from "./EditPwd";
import Space from "./Space";
import Members from "./Members";
import { Routes, Route, Link } from "react-router-dom";
import Config from '../Config';

function Main() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleLogout = async () => {
    setLoading(true);
    const response = await fetch(Config.apiUrl + '/logout', {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      },
    });
    if (response.ok) {
      sessionStorage.removeItem("access_token");
      window.location.reload(false);
    }
  };

  useEffect(() => {
    setMsg('\u00A0')
  }, []);

  return (
    <div className="App">
      <nav className="nav">
        <span className="logo-text">Shared Spaces</span>
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/edit-pwd" className="nav-item">Change password</Link>
        <Link to="/" className="nav-item" onClick={handleLogout}>{loading ? 'Logging out...' : 'Logout (' + sessionStorage.getItem("currentUser") + ')'}</Link>
      </nav>
      <div className="msg">{msg}</div>
      <Routes>
        <Route path="/" element={<Spaces setMsg={setMsg} />}></Route>
        <Route path="/edit-pwd" element={<EditPwd setMsg={setMsg} />}></Route>
        <Route path="/space/:spaceId" element={<Space setMsg={setMsg} />}></Route>
        <Route path="/space/:spaceId/members" element={<Members />}></Route>
      </Routes>
    </div>
  );
}

export default Main;