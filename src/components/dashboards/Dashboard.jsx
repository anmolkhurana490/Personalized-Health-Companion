import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Admin from "./Admin";
import Doctor from "./Doctor";
import User from "./User";

const DashboardRoutes = () => {
    return (
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="admin" element={<Admin />} /> */}
        <Route path="doctor" element={<Doctor />} />
        <Route path="user" element={<User />} />
      </Routes>
    )
  }

const Dashboard = () => {
  return (
    <div className='w-4/5'>
        <DashboardRoutes />
    </div>
  )
}

export default Dashboard
