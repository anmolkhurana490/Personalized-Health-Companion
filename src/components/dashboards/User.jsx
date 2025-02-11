import React from 'react';
import { FaUser } from "react-icons/fa";

const UserDashboard = () => {
    return (
        <>
            <header className="p-4">
                <h1 className="text-2xl font-semibold">
                    User Dashboard <FaUser className='inline text-3xl' />
                </h1>
            </header>

            <div className="min-h-screen w-full bg-gray-200 bg-opacity-70 rounded-lg flex">
                <aside className="w-64 bg-gray-800 text-white p-4">
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Profile</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Health Overview</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Appointments</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Lifestyle Tracker</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Medical History</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Notifications/Reminders</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Settings</a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main className="container mx-auto p-4">
                    <h2 className="text-xl font-semibold mb-4">Welcome, User!</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Profile</h3>
                            <p className="mt-2">View and edit your profile information.</p>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Health Overview</h3>
                            <p className="mt-2">Check your latest health statistics.</p>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Appointments</h3>
                            <p className="mt-2">Upcoming appointments with doctors.</p>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Lifestyle Tracker</h3>
                            <p className="mt-2">Track users' daily habits.</p>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Medical History</h3>
                            <p className="mt-2">Upload and view reports or prescriptions.</p>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Notifications/Reminders</h3>
                            <p className="mt-2">Medication reminders and upcoming appointment notifications.</p>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Settings</h3>
                            <p className="mt-2">Manage your account settings.</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default UserDashboard;