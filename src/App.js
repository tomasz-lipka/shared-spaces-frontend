import React from "react";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Spaces from "./components/Spaces";
import EditPwd from "./components/EditPwd";


function App() {
  const [spaces] = React.useState([
    { spaceName: 'space 1', id: 1 },
    { spaceName: 'space 2', id: 2 },
    { spaceName: 'space 3', id: 3 },
  ]);
  return (
    <div className="App">
      <nav className="nav">
        <span className="logo-text">Shared Spaces</span>
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/edit-pwd" className="nav-item">Change password</Link>
        <Link to="/logout" className="nav-item">Logout</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Spaces spaces={spaces} />}></Route>
        <Route path="/edit-pwd" element={<EditPwd />}></Route>
      </Routes>
    </div>
  );
}

export default App;
