import React, { useContext } from 'react'
import { AppContext } from '../AppProvider';

import { IoSunny, IoMoon } from "react-icons/io5";
import { logoutHandler } from './Auth_Components/handlers';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { loggedIn, setLoggedIn, profile, setProfile, darkTheme, setDarkTheme, currRole } = useContext(AppContext);

    const toggleTheme = () => {
        console.log('theme changed')
        setDarkTheme(!darkTheme);
    };

    const navigate = useNavigate();

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">VitalSphere</div>

                <div className="flex space-x-16 items-center">
                    {loggedIn ? (
                        <button onClick={() => logoutHandler(setLoggedIn, setProfile, navigate)} className='bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200'>Logout</button>
                    ) : (
                        <div className='flex space-x-4'>
                            <a href="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">Login</a>
                            <a href="/signup" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">Sign Up</a>
                        </div>
                    )}

                    <button className='text-white text-3xl px-2 py-1' onClick={toggleTheme}>
                        {darkTheme ? <IoSunny /> : <IoMoon />}
                    </button>

                    <ul className="flex space-x-4 text-lg">
                        <li><a href="/home" className="text-white hover:text-gray-200">Home</a></li>
                        <li><a href="#" className="text-white hover:text-gray-200">About</a></li>
                        <li><a href="#" className="text-white hover:text-gray-200">Services</a></li>
                        <li><a href="#" className="text-white hover:text-gray-200">Contact</a></li>
                        {loggedIn && <li><Link to={`/dashboard/${currRole}`} className="text-white hover:text-gray-200 capitalize">{currRole} Dashboard</Link></li>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
