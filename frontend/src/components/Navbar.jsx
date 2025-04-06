import React, { useContext, useState } from 'react';
import { AppContext } from '../AppProvider';

import { IoSunny, IoMoon, IoMenu } from "react-icons/io5";
import { logoutHandler } from './Auth_Components/handlers';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { loggedIn, setLoggedIn, profile, setProfile, darkTheme, setDarkTheme, currRole } = useContext(AppContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleTheme = () => {
        console.log('theme changed');
        setDarkTheme(!darkTheme);
    };

    const navigate = useNavigate();

    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleDocumentClick = (e) => {
        if (!e.target.closest('.menu-btn') && !e.target.closest('.menu-content')) {
            setMenuOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <nav className={`p-4 ${darkTheme ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'}`}>
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="text-2xl font-bold">VitalSphere</div>

                <div className="flex items-center gap-2 ml-auto flex-row md:space-x-4">
                    {loggedIn ? (
                        <button
                            onClick={() => logoutHandler(setLoggedIn, setProfile, navigate)}
                            className={`px-4 py-2 rounded hover:bg-gray-200 ${darkTheme ? 'bg-blue-700 text-white' : 'bg-white text-blue-600'}`}
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-x-4 gap-y-1">
                            <a
                                href="/login"
                                className={`px-4 py-2 rounded hover:bg-gray-200 ${darkTheme ? 'bg-blue-700 text-white' : 'bg-white text-blue-600'}`}
                            >
                                Login
                            </a>
                            <a
                                href="/signup"
                                className={`px-4 py-2 rounded hover:bg-gray-200 ${darkTheme ? 'bg-blue-700 text-white' : 'bg-white text-blue-600'}`}
                            >
                                Sign Up
                            </a>
                        </div>
                    )}

                    <button
                        className="text-3xl px-2 py-1"
                        onClick={toggleTheme}
                    >
                        {darkTheme ? <IoSunny /> : <IoMoon />}
                    </button>
                </div>

                <button
                    className="menu-btn md:hidden text-3xl ml-4"
                    onClick={handleMenuToggle}
                >
                    <IoMenu />
                </button>

                <div
                    className={`menu-content md:flex md:space-x-16 items-center fixed md:static top-16 left-0 z-10 bg-blue-600 md:bg-transparent not-md:h-screen not-md:min-w-50 p-4 md:p-0 md:ml-8 transition-transform transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                        } md:translate-x-0`}
                >
                    <ul className="flex flex-col md:flex-row md:space-x-4 text-lg">
                        <li><a href="/home" className="hover:text-gray-200">Home</a></li>
                        <li><a href="#" className="hover:text-gray-200">About</a></li>
                        <li><a href="#" className="hover:text-gray-200">Services</a></li>
                        <li><a href="#" className="hover:text-gray-200">Contact</a></li>
                        {loggedIn && (
                            <li>
                                <Link to={`/dashboard/${currRole}`} className="capitalize hover:text-gray-200">
                                    {currRole} Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
