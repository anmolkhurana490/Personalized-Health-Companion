import React from 'react';
import { FaUserDoctor } from "react-icons/fa6";

const DoctorDashboard = () => {
    return (
        <>
            <header className="p-4">
                <h1 className="text-2xl font-semibold">
                    Doctor Dashboard <FaUserDoctor className='inline text-3xl' />
                </h1>
            </header>

            <div className="min-h-screen w-full bg-gray-200 bg-opacity-70 rounded-lg flex">
                <aside className="w-64 bg-gray-800 text-white p-4">
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Patient List</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Appointments Manager</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Chats with Patients</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Reports/Prescriptions</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Analytics</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Notifications</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Settings</a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main className="container mx-auto p-4">
                    <h2 className="text-xl font-semibold mb-4">Welcome, Doctor!</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Patient List</h3>
                            <p className="mt-2">View and manage your patients.</p>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Appointments Manager</h3>
                            <p className="mt-2">Check your upcoming appointments.</p>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Chats with Patients</h3>
                            <p className="mt-2">Real-time chat interface for patient interaction.</p>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Reports/Prescriptions</h3>
                            <p className="mt-2">Upload and manage patient prescriptions.</p>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Analytics</h3>
                            <p className="mt-2">Overview of the number of consultations, patient feedback ratings.</p>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Notifications</h3>
                            <p className="mt-2">Alerts for upcoming appointments or messages from patients.</p>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Settings</h3>
                            <p className="mt-2">Adjust your account settings.</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default DoctorDashboard;