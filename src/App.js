import React from "react";
import './App.css';
import Auth from "./components/auth/Auth";
import Main from "./components/main/Main";

function App() {
  //eslint-disable-next-line
  const [authenticated, setAuthenticated] = React.useState(false);

  if (!sessionStorage.getItem("access_token")) {
    return <Auth setAuthenticated={setAuthenticated} />
  }
  return <Main />
}

export default App;
