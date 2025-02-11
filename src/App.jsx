import React, { useContext, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/Auth_Components/Login';
import Signup from './components/Auth_Components/Signup';
import Dashboard from './components/dashboards/Dashboard';

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppContext } from './AppProvider';
import { getProfile } from './handlers';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  )
}


const App = () => {
  const { loggedIn, setLoggedIn, profile, setProfile, darkTheme, setDarkTheme } = useContext(AppContext);

  useEffect(() => getProfile(setProfile, setLoggedIn), []);

  return (
    <>
      <Router>
        <div className={'main-container overflow-y-auto h-screen custom-scrollbar bg-opacity-80 ' + (darkTheme ? "bg-black text-white" : "bg-transparent text-black")}>
          <Navbar />

          <div className="min-h-[85vh] flex flex-col items-center my-8">
            <AppRoutes />
          </div>

          <Footer />
        </div>
      </Router>

      <div className={"waves " + (darkTheme ? "dark-waves" : "")}>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </>

  )
}

export default App
