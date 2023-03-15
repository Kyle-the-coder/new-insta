
import './App.css';
import Autho from './components/Autho';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import LandingPage from './views/LandingPage';
import { userInputs } from './dataTable';
import { useState, useContext } from 'react'
import OneImg from './views/OneImg';
import OneVid from './views/OneVid';
import { AuthContext } from './context/AuthContext'


function App() {
  const [loggedIn, setLoggedIn] = useState('')
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="login" />
  }
  return (
    <div className="bg-slate-600 w-full  h-screen">
      <Routes>
        <Route path="/">

          <Route path="login" element={<Autho loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInputs={userInputs} />} />
          <Route index element={<RequireAuth><LandingPage loggedIn={loggedIn} /></RequireAuth>} />
          <Route path="yourimg" element={<RequireAuth><OneImg loggedIn={loggedIn} /></RequireAuth>} />
          <Route path="yourvid" element={<RequireAuth><OneVid loggedIn={loggedIn} /></RequireAuth>} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
