import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { AppContext } from '../AppProvider';
import { Link } from 'react-router-dom';

const Home = () => {
    const { currRole, loggedIn } = useContext(AppContext);

    return (
        <main className="flex flex-col items-center mt-16 px-2">
            <img src={logo} width={200}></img>
            <h1 className="text-5xl font-bold mb-4 text-center">Welcome to VitalSphere</h1>
            <p className="text-xl mb-8 text-center">
                Your personalized health companion. Track your health, get insights, and stay motivated.
            </p>
            <Link to={loggedIn ? `/dashboard/${currRole}` : '/login'} className="bg-blue-600 text-white text-xl py-2 px-4 rounded hover:bg-blue-700">
                Get Started
            </Link>
        </main>
    )
}

export default Home
