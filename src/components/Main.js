import React, { useState } from 'react';
import Spaces from "./Spaces";
import EditPwd from "./EditPwd";
import Space from "./Space";
import { Routes, Route, Link } from "react-router-dom";
import config from '../config';

function Main({ setAuthenticated }) {
  const [loading, setLoading] = useState(false);


  const handleLogout = async () => {
    setLoading(true);
    const response = await fetch(config.apiUrl + '/logout', {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      },
    });
    if (response.ok) {
      sessionStorage.removeItem("access_token");
      setAuthenticated(false);
    }
  };

  return (
    <div className="App">
      <nav className="nav">
        <span className="logo-text">Shared Spaces</span>
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/edit-pwd" className="nav-item">Change password</Link>
        <Link to="/" className="nav-item" onClick={handleLogout}>{loading ? 'Logging out...' : 'Logout'}</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Spaces />}></Route>
        <Route path="/edit-pwd" element={<EditPwd />}></Route>
        <Route path="/space/:id" element={<Space />}></Route>
      </Routes>
    </div>
  );
}

export default Main;