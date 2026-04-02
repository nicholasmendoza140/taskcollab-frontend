import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login';
import './App.css'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"))

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to={loggedIn ? "/teams" : "/login"} />} 
        />
        <Route 
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} />}
        />
      </Routes>
    </Router>
  )
}

