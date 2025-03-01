import React, { useContext, useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios';

import { AppContext } from '../../AppProvider';
import HealthOverview from './user_components/HealthOverview'
import Profile from './user_components/Profile'
import DoctorConsultaion from './user_components/DoctorConsultation'
import AIHealthAssistant from './user_components/AIHealthAssistant'
import Appointments from './user_components/Appointments';
import LifestyleTracker from './user_components/LifestyleTracker';
import MedicalHistory from './user_components/MedicalHistory';

const UserDashboardRoutes = () => {
    const { profile, setProfile } = useContext(AppContext);

    return (
        <Routes>
            <Route path="" element={<MainDashboard profile={profile} />} />
            <Route path="profile" element={<Profile profile={profile} setProfile={setProfile} />} />
            <Route path="health-overview" element={<HealthOverview profile={profile} />} />
            <Route path="doctor-consultation" element={<DoctorConsultaion />} />
            <Route path="ai-health-assistant" element={<AIHealthAssistant />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="lifestyle-tracker" element={<LifestyleTracker />} />
            <Route path="medical-history" element={<MedicalHistory />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
        </Routes>
    )
}

const UserDashboard = () => {
    const { loggedIn } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn == false) {
            navigate('/login');
            alert('Please Login First!');
        }
    }, [])

    return (
        <>
            <header className="p-4">
                <h1 className="text-2xl font-semibold">
                    User Dashboard <FaUser className='inline text-3xl' />
                </h1>
            </header>

            <div className=" min-h-[75vh] max-h-screen w-full bg-gray-200 bg-opacity-70 rounded-lg flex">
                <aside className="w-64 bg-gray-800 text-white p-4">
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <Link to="/dashboard/user" className="hover:text-gray-400">Home</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/user/profile" className="hover:text-gray-400">Profile</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/user/health-overview" className="hover:text-gray-400">Health Overview</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/user/doctor-consultation" className="hover:text-gray-400">Doctor Consultation</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/user/ai-health-assistant" className="hover:text-gray-400">AI Health Assistant</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/user/appointments" className="hover:text-gray-400">Appointments</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/user/lifestyle-tracker" className="hover:text-gray-400">Lifestyle Tracker</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/user/medical-history" className="hover:text-gray-400">Medical History</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/user/notifications" className="hover:text-gray-400">Notifications/Reminders</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/user/settings" className="hover:text-gray-400">Settings</Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main className="container mx-auto px-4 py-2">

                    <UserDashboardRoutes />

                </main>
            </div>
        </>
    );
};

const MainDashboard = ({ profile }) => {

    return (
        <>
            <div className='flex justify-between px-4 py-2 my-2 items-center'>
                <h2 className="text-xl font-semibold mb-4">Welcome, {profile && profile.personal_info.fullName}!</h2>
                <img src={`/profilePicture/${profile && profile.profilePicture}`} className='w-24 h-24 object-cover rounded-full' />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/dashboard/user/profile">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Profile</h3>
                        <p className="mt-2">View and edit your profile information.</p>
                    </div>
                </Link>

                <Link to="/dashboard/user/health-overview">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Health Overview</h3>
                        <p className="mt-2">Check your latest health statistics.</p>
                    </div>
                </Link>

                <Link to="/dashboard/user/doctor-consultation">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Doctor Consultation</h3>
                        <p className="mt-2">Chat, Video Call, Book Appointment.</p>
                    </div>
                </Link>

                <Link to="/dashboard/user/ai-health-assistant">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">AI Health Assistant</h3>
                        <p className="mt-2">AI Doctor Chat</p>
                    </div>
                </Link>

                <Link to="/dashboard/user/appointments">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Appointments</h3>
                        <p className="mt-2">Upcoming appointments with doctors.</p>
                    </div>
                </Link>

                <Link to="/dashboard/user/lifestyle-tracker">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Lifestyle Tracker</h3>
                        <p className="mt-2">Track users' daily habits.</p>
                    </div>
                </Link>

                <Link to="/dashboard/user/medical-history">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Medical History</h3>
                        <p className="mt-2">Upload and view reports or prescriptions.</p>
                    </div>
                </Link>

                <Link to="/dashboard/user/notifications">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Notifications/Reminders</h3>
                        <p className="mt-2">Medication reminders and upcoming appointment notifications.</p>
                    </div>
                </Link>

                <Link to="/dashboard/user/settings">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Settings</h3>
                        <p className="mt-2">Manage your account settings.</p>
                    </div>
                </Link>
            </div>
        </>
    )
}


const Notifications = () => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">Notifications/Reminders</h2>
            <p>Medication reminders and upcoming appointment notifications.</p>
        </div>
    );
};

const Settings = () => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">Settings</h2>
            <p>Manage your account settings here.</p>
        </div>
    );
};

export default UserDashboard;