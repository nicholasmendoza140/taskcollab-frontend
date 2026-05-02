import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/login'
import Home from './pages/home'
import Team from './pages/team'
import Project from './pages/project'
import { useEffect } from 'react'
import './App.css'

const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"))

  const resetTimer = () => {
    localStorage.setItem("lastActivity", Date.now())
  }

  useEffect(() => {
    const events = ["click", "mousemove", "keydown", "scroll"]
    for (const event of events) {
      window.addEventListener(event, resetTimer)
    }

    resetTimer();

    return () => {
      for (const event of events) {
        window.removeEventListener(event, resetTimer)
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const lastActivity = localStorage.getItem("lastActivity")

      if (lastActivity && Date.now() - lastActivity > INACTIVITY_LIMIT) {
        console.log("Inactive session")
        localStorage.removeItem("token")
        setLoggedIn(false)
      }
    }, 60000)
    return () => clearInterval(interval);
  }, [])

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to={loggedIn ? "/home" : "/login"} />} 
        />
        <Route 
          path="/login"
          element={loggedIn ? <Navigate to="/home" /> : <Login setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/home"
          element={loggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/teams/:teamId"
          element={loggedIn? <Team /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects/:projectId"
          element={loggedIn? <Project /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

