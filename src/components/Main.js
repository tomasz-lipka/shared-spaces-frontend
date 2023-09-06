import React from "react";
import Spaces from "./Spaces";
import EditPwd from "./EditPwd";
import { Routes, Route, Link } from "react-router-dom";

function Main() {
  const [data, setData] = React.useState([]);

  const url = 'https://tomasz-lipka-scaling-palm-tree-x9p56pvw9wr2jp7-5000.app.github.dev/spaces';

  React.useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        console.log(data);
      });
  }, []);


  return (
    <div className="App">
      <nav className="nav">
        <span className="logo-text">Shared Spaces</span>
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/edit-pwd" className="nav-item">Change password</Link>
        <Link to="/logout" className="nav-item">Logout</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Spaces props={data} />}></Route>
        <Route path="/edit-pwd" element={<EditPwd />}></Route>
      </Routes>
    </div>
  );
}
export default Main;