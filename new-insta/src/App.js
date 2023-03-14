import logo from './logo.svg';
import './App.css';
import { Auth } from './components/Autho';
import { Routes, Route } from "react-router-dom"
import LandingPage from './views/LandingPage';
import {useState} from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState('')
  return (
    <div className="bg-slate-600 w-full h-[2000px]">
      <Routes>
        <Route path="/" element={<Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/loggedIn" element={<LandingPage loggedIn={loggedIn}/>}/>
      </Routes>

    </div>
  );
}

export default App;
