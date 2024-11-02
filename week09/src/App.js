import {createContext,useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

const NameContext=createContext();

const NameProvider

const Home = ({ name }) => {
  return (
    <div className="text-4xl font-extrabold">
      <h1>It's Name {name}</h1>
    </div>
  );
};

const About = ({ name }) => {
  return (
    <div className="text-4xl text-red-400 font-extrabold">
      <h1>It's About {name}</h1>
    </div>
  );
};

function App() {
  const [name, setName] = useState("Nala Sinephro");
  return (
    <Router>
      <nav className="">
        <ul
          className={
            'flex justify-start gap-10 text-slate-500;'}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home name={name} />} />
        <Route path="/about" element={<About name={name} />} />
      </Routes>
    </Router>
  );
}

export default App;
