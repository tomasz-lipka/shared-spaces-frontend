import React, { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { makeRequest } from "../../Helper"
import Config from '../../Config';
import Spaces from "./Spaces";
import EditPwd from "./EditPwd";
import Space from "./Space";
import Members from "./Members";
import Images from './Images';

function Main() {
  const [msg, setMsg] = useState('');

  async function handleLogout() {
    setMsg(Config.waitMsg)
    let response = await makeRequest('/logout', 'DELETE', null)
    if (response.ok) {
      sessionStorage.removeItem("access_token");
      window.location.reload(false);
    } else {
      setMsg(await response.text())
    }
  };

  return (
    <div className="App">
      <nav className="main-menu-bar">
        <Link to="/" className="logo-text">Shared Spaces</Link>
        <Link to="/" className="main-menu-item">Home</Link>
        <Link to="/edit-pwd" className="main-menu-item">Change password</Link>
        <Link to="/" className="main-menu-item" onClick={handleLogout}>{'Logout (' + sessionStorage.getItem("currentUser") + ')'}</Link>
      </nav>
      <div className="msg-bar">
        <div class="loading">{msg}</div>
      </div>
      <Routes>
        <Route path="/" element={<Spaces setMsg={setMsg} />}></Route>
        <Route path="/edit-pwd" element={<EditPwd setMsg={setMsg} />}></Route>
        <Route path="/spaces/:spaceId" element={<Space setMsg={setMsg} />}></Route>
        <Route path="/spaces/:spaceId/members" element={<Members setMsg={setMsg} />}></Route>
        <Route path="/spaces/:spaceId/images" element={<Images setMsg={setMsg} />}></Route>
      </Routes>
    </div>
  );
}

export default Main;