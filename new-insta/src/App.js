import logo from './logo.svg';
import './App.css';
import { Auth } from './components/Autho';
import { Routes, Route } from "react-router-dom"
import LandingPage from './views/LandingPage';
import {useState} from 'react'
import OneImg from './views/OneImg';
import InstaNav from './components/Navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState('')
  return (
    <div className="bg-slate-600 w-full  ">
      <Routes>
        <Route path="/" element={<Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/loggedIn" element={<LandingPage loggedIn={loggedIn}/>}/>
        <Route path="/yourimg" element={<OneImg loggedIn={loggedIn}/>}/>
      </Routes>

    </div>
  );
}

export default App;
