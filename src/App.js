import './App.css';
import Nav from "./components/Nav";
import Space from "./components/Space";
import EditPwd from "./components/EditPwd";


function App() {
  return (
    <>
      <div className="App">
        <Nav />
      </div>
      <Space spaceName="Space 1" />
      <Space spaceName="Space 2" />
      <Space spaceName="Space 3" />
      <EditPwd />
    </>
  );
}

export default App;
