import React, { useState } from 'react';
import Spaces from "./Spaces";
import EditPwd from "./EditPwd";
import { Routes, Route, Link } from "react-router-dom";
import config from '../config';

function Main({ setAuthenticated }) {
  const [data, setData] = useState([]);

  function handleLogout() {
    sessionStorage.removeItem("access_token");
    setAuthenticated(false);
  }

  React.useEffect(() => {
    fetch(config.apiUrl + '/spaces', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <nav className="nav">
        <span className="logo-text">Shared Spaces</span>
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/edit-pwd" className="nav-item">Change password</Link>
        <Link to="/" className="nav-item" onClick={handleLogout}>Logout</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Spaces props={data} />}></Route>
        <Route path="/edit-pwd" element={<EditPwd />}></Route>
      </Routes>
    </div>
  );
}

export default Main;