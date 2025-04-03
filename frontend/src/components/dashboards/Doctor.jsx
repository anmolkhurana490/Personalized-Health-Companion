import React, { useContext, useEffect, useState } from 'react';
import { FaUserDoctor } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './doctor_components/Profile';
import Patients from './doctor_components/Patients';
import Appointments from './doctor_components/Appointments';
import ChatsandCalls from './doctor_components/ChatsandCalls';
import Analytics from './doctor_components/Analytics';
import ReportsandPrescriptions from './doctor_components/ReportsandPrescriptions';

const DoctorDashboardRoutes = () => {
    const { profile, setProfile } = useContext(AppContext);

    return (
        <Routes>
            <Route path="" element={<MainDashboard profile={profile} />} />
            <Route path="profile" element={<Profile profile={profile} setProfile={setProfile} currRole={'doctor'} />} />
            <Route path="patients" element={<Patients profile={profile} />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="chatsAndCalls" element={<ChatsandCalls />} />
            <Route path="reports" element={<ReportsandPrescriptions />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
        </Routes>
    )
}

const DoctorDashboard = () => {
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
                    Doctor Dashboard <FaUserDoctor className='inline text-3xl' />
                </h1>
            </header>


            <div className="h-[80vh] w-full bg-gray-200 bg-opacity-70 rounded-lg flex">
                <aside className="w-64 bg-gray-800 text-white p-4">
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <Link to="/dashboard/doctor" className="hover:text-gray-400">Home</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/doctor/profile" className="hover:text-gray-400">Profile</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/doctor/patients" className="hover:text-gray-400">Patient List</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/doctor/appointments" className="hover:text-gray-400">Appointments Manager</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/doctor/chatsAndCalls" className="hover:text-gray-400">Chat/Call with Patients</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/doctor/reports" className="hover:text-gray-400">Reports/Prescriptions</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/doctor/analytics" className="hover:text-gray-400">Analytics</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/doctor/notifications" className="hover:text-gray-400">Notifications</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard/doctor/settings" className="hover:text-gray-400">Settings</Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main className="container mx-auto p-4 overflow-y-auto custom-scrollbar">
                    <DoctorDashboardRoutes />
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
                <Link to="/dashboard/doctor/profile">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Patient List</h3>
                        <p className="mt-2">View and manage your patients.</p>
                    </div>
                </Link>

                <Link to="/dashboard/doctor/profile">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Appointments Manager</h3>
                        <p className="mt-2">Check your upcoming appointments.</p>
                    </div>
                </Link>

                <Link to="/dashboard/doctor/profile">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Chat/Call with Patients</h3>
                        <p className="mt-2">Real-time chats or video call for patient interaction.</p>
                    </div>
                </Link>

                <Link to="/dashboard/doctor/profile">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Reports/Prescriptions</h3>
                        <p className="mt-2">Upload and manage patient prescriptions.</p>
                    </div>
                </Link>

                <Link to="/dashboard/doctor/profile">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Analytics</h3>
                        <p className="mt-2">Overview of the number of consultations, patient feedback ratings.</p>
                    </div>
                </Link>

                <Link to="/dashboard/doctor/profile">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Notifications</h3>
                        <p className="mt-2">Alerts for upcoming appointments or messages from patients.</p>
                    </div>
                </Link>

                <Link to="/dashboard/doctor/profile">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Settings</h3>
                        <p className="mt-2">Adjust your account settings.</p>
                    </div>
                </Link>
            </div>
        </>
    )
}

const Notifications = () => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2>Notifications</h2>
            <p>View your notifications here.</p>
        </div>
    );
};

const Settings = () => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2>Settings</h2>
            <p>Manage your settings here.</p>
        </div>
    );
};

export default DoctorDashboard;