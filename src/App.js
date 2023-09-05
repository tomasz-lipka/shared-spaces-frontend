import './App.css';
import Nav from "./components/Nav";
import Space from "./components/Space";


function App() {
  return (
    <>
      <div className="App">
        <Nav/>
      </div>
      <Space user="Tom" date="1.1.2023" text="Lorem ipsum Lorem ipsum Lorem ipsum"/>
      <Space user="Tom" date="1.1.2023" text="Lorem ipsum Lorem ipsum Lorem ipsum"/>
      <Space user="Tom" date="1.1.2023" text="Lorem ipsum Lorem ipsum Lorem ipsum"/>
    </>
  );
}

export default App;
