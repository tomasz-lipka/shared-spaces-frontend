import React from "react";
import './App.css';
import Login from "./components/Login";
import Main from "./components/Main";


function App() {
  const [authenticated, setAuthenticated] = React.useState(false);

  if (!authenticated && !sessionStorage.getItem("access_token")) {
    return <Login setAuthenticated={setAuthenticated} />
  }
  return <Main setAuthenticated={setAuthenticated} />
}

export default App;
