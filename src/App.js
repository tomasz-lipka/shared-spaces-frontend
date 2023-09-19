import React from "react";
import './App.css';
import Auth from "./components/Auth";
import Main from "./components/Main";


function App() {
  const [authenticated, setAuthenticated] = React.useState(false);

  if (!sessionStorage.getItem("access_token")) {
    return <Auth setAuthenticated={setAuthenticated} />
  }
  return <Main />
}

export default App;
