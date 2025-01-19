import React from 'react'
import logo from '../assets/logo.png'

const Home = () => {
    return (
        <main className="flex flex-col items-center mb-16">
            <img src={logo} width={200}></img>
            <h1 className="text-5xl font-bold mb-4">Welcome to VitalSphere</h1>
            <p className="text-xl text-gray-700 mb-8 text-center">
                Your personalized health companion. Track your health, get insights, and stay motivated.
            </p>
            <button className="bg-blue-600 text-white text-xl py-2 px-4 rounded hover:bg-blue-700">
                Get Started
            </button>
        </main>
    )
}

export default Home
