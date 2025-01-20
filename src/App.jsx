import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/Auth_Components/Login';

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Auth_Components/Signup';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    }
  ])

  return (
    <>
      <div className='overflow-y-auto h-screen custom-scrollbar'>
        <Navbar />
        <div className="min-h-[85vh] flex flex-col items-center my-8">
          <RouterProvider router={router} />
        </div>
        <Footer />
      </div>

      <div className="waves">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </>

  )
}

export default App
