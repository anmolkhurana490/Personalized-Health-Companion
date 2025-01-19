import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">VitalSphere</div>
                <ul className="flex space-x-4 text-lg">
                    <li><a href="#" className="text-white hover:text-gray-200">Home</a></li>
                    <li><a href="#" className="text-white hover:text-gray-200">About</a></li>
                    <li><a href="#" className="text-white hover:text-gray-200">Services</a></li>
                    <li><a href="#" className="text-white hover:text-gray-200">Contact</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
