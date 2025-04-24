import React, { useContext, useEffect } from 'react';
import { FaUserDoctor } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppProvider';
import { Routes, Route } from 'react-router-dom';
import Profile from './doctor_components/Profile';
import Patients from './doctor_components/Patients';
import Appointments from './doctor_components/Appointments';
import Chats from './doctor_components/Chats';
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
            <Route path="chats" element={<Chats />} />
            <Route path="reports" element={<ReportsandPrescriptions />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
        </Routes>
    );
};

const DoctorDashboard = () => {
    const { loggedIn, darkTheme } = useContext(AppContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = React.useState(false);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
            alert('Please Login First!');
        }
    }, [loggedIn, navigate]);

    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleDocumentClick = (e) => {
        if (!e.target.closest('.menu-btn') && !e.target.closest('aside')) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <>
            <header className={`p-4 flex justify-between items-center ${darkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
                <h1 className="text-2xl font-semibold">
                    Doctor Dashboard <FaUserDoctor className="inline text-3xl" />
                </h1>

                <button
                    className="menu-btn md:hidden p-2 mr-4 rounded"
                    onClick={handleMenuToggle}
                >
                    <IoMenu className="text-4xl" />
                </button>
            </header>

            <div className={`relative min-h-[80vh] max-h-screen w-full flex ${darkTheme ? 'bg-gray-900' : 'bg-gray-200'}`}>
                <aside
                    className={`min-w-64 not-md:h-screen p-4 bg-gray-800 not-md:fixed z-10 top-0 right-0 transform transition-transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 ${darkTheme ? 'text-white' : 'text-gray-800'}`}
                >
                    <nav>
                        <ul>
                            {[
                                { to: "/dashboard/doctor", label: "Home" },
                                { to: "/dashboard/doctor/profile", label: "Profile" },
                                { to: "/dashboard/doctor/patients", label: "Patient List" },
                                { to: "/dashboard/doctor/appointments", label: "Appointments Manager" },
                                { to: "/dashboard/doctor/chats", label: "Chat with Patients" },
                                { to: "/dashboard/doctor/reports", label: "Reports/Prescriptions" },
                                { to: "/dashboard/doctor/analytics", label: "Analytics" },
                                { to: "/dashboard/doctor/notifications", label: "Notifications" },
                                { to: "/dashboard/doctor/settings", label: "Settings" },
                            ].map((item, index) => (
                                <li key={index} className="mb-4">
                                    <Link to={item.to} className="text-white" onClick={() => setMenuOpen(false)}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className={`flex-1 container mx-auto px-4 py-2 overflow-y-auto custom-scrollbar ${darkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
                    <DoctorDashboardRoutes />
                </main>
            </div>
        </>
    );
};

const MainDashboard = ({ profile }) => {
    const { darkTheme } = useContext(AppContext);

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between px-4 py-2 my-2 items-center">
                <h2 className={`text-xl font-semibold mb-4 ${darkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
                    Welcome, {profile && profile.personal_info.fullName}!
                </h2>
                <img
                    src={`/profilePicture/${profile && profile.profilePicture}`}
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-full"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    { to: "/dashboard/doctor/profile", title: "Profile", description: "View and manage your profile." },
                    { to: "/dashboard/doctor/patients", title: "Patient List", description: "View and manage your patients." },
                    { to: "/dashboard/doctor/appointments", title: "Appointments Manager", description: "Check your upcoming appointments." },
                    { to: "/dashboard/doctor/chats", title: "Chat with Patients", description: "Real-time chats or video call for patient interaction." },
                    { to: "/dashboard/doctor/reports", title: "Reports/Prescriptions", description: "Upload and manage patient prescriptions." },
                    { to: "/dashboard/doctor/analytics", title: "Analytics", description: "Overview of consultations and feedback." },
                    { to: "/dashboard/doctor/notifications", title: "Notifications", description: "Alerts for upcoming appointments or messages." },
                    { to: "/dashboard/doctor/settings", title: "Settings", description: "Adjust your account settings." },
                ].map((item, index) => (
                    <Link key={index} to={item.to}>
                        <div className={`p-4 rounded shadow hover:shadow-lg transition-shadow ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="mt-2">{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

const Notifications = () => {
    const { darkTheme } = useContext(AppContext);

    return (
        <div className={`p-4 rounded shadow ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
            <p>View your notifications here.</p>
        </div>
    );
};

const Settings = () => {
    const { darkTheme } = useContext(AppContext);

    return (
        <div className={`p-4 rounded shadow ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-2">Settings</h2>
            <p>Manage your settings here.</p>
        </div>
    );
};

export default DoctorDashboard;
