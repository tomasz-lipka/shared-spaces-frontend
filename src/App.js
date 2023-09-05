import React from "react";
import './App.css';
import Nav from "./components/Nav";
import Spaces from "./components/Spaces";
import EditPwd from "./components/EditPwd";


function App() {
  const [spaces] = React.useState([
    { spaceName: 'space 1', id: 1 },
    { spaceName: 'space 2', id: 2 },
    { spaceName: 'space 3', id: 3 },
  ]);
  return (
    <>
      <div>
        <Nav />
      </div>
      <Spaces spaces={spaces} />
      <EditPwd />
    </>
  );
}

export default App;
