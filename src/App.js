import { useState } from "react";
import './App.css';
import Auth from "./components/auth/Auth";
import MainMenu from "./components/main/MainMenu";

function App() {
  //eslint-disable-next-line
  const [authenticated, setAuthenticated] = useState(false);

  if (!sessionStorage.getItem("access_token")) {
    return <Auth setAuthenticated={setAuthenticated} />
  }
  return <MainMenu />
}

export default App;
