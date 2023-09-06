import React from "react";
import './App.css';
import Login from "./components/Login";
import Main from "./components/Main";


function App() {
  const [token, setToken] = React.useState();


  const updateToken = (token) => {
    setToken(token);
  };

  if (!token) {
    return <Login
      updateParentState={updateToken}
    />
  }
  return <Main token={token} />


}

export default App;
