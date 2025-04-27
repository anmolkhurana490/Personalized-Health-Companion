import React, { useContext, useEffect } from 'react';
import { IoMenu } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import { AppContext } from '../../AppProvider';
import HealthOverview from './user_components/HealthOverview';
import Profile from './user_components/Profile';
import DoctorConsultaion from './user_components/DoctorConsultation';
import AIHealthAssistant from './user_components/AIHealthAssistant';
import Appointments from './user_components/Appointments';
import LifestyleTracker from './user_components/LifestyleTracker';
import MedicalHistory from './user_components/MedicalHistory';
import Notifications from './user_components/Notifications';

const UserDashboardRoutes = () => {
    const { profile, setProfile } = useContext(AppContext);

    return (
        <Routes>
            <Route path="" element={<MainDashboard profile={profile} />} />
            <Route path="profile" element={<Profile profile={profile} setProfile={setProfile} currRole={'user'} />} />
            <Route path="health-overview" element={<HealthOverview profile={profile} />} />
            <Route path="doctor-consultation" element={<DoctorConsultaion />} />
            <Route path="ai-health-assistant" element={<AIHealthAssistant />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="lifestyle-tracker" element={<LifestyleTracker />} />
            <Route path="medical-history" element={<MedicalHistory />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
        </Routes>
    );
};

const UserDashboard = () => {
    const { loggedIn, darkTheme } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
            alert('Please Login First!');
        }
    }, [loggedIn, navigate]);

    const [menuOpen, setMenuOpen] = React.useState(false);

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
                    User Dashboard
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
                                { to: "/dashboard/user", label: "Home" },
                                { to: "/dashboard/user/profile", label: "Profile" },
                                { to: "/dashboard/user/health-overview", label: "Health Overview" },
                                { to: "/dashboard/user/doctor-consultation", label: "Doctor Consultation" },
                                { to: "/dashboard/user/ai-health-assistant", label: "AI Health Assistant" },
                                { to: "/dashboard/user/appointments", label: "Appointments" },
                                { to: "/dashboard/user/lifestyle-tracker", label: "Lifestyle Tracker" },
                                { to: "/dashboard/user/medical-history", label: "Medical History" },
                                { to: "/dashboard/user/notifications", label: "Notifications/Reminders" },
                                { to: "/dashboard/user/settings", label: "Settings" },
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
                    <UserDashboardRoutes />
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
                    { to: "/dashboard/user/profile", title: "Profile", description: "View and edit your profile information." },
                    { to: "/dashboard/user/health-overview", title: "Health Overview", description: "Check your latest health statistics." },
                    { to: "/dashboard/user/doctor-consultation", title: "Doctor Consultation", description: "Chat, Video Call, Book Appointment." },
                    { to: "/dashboard/user/ai-health-assistant", title: "AI Health Assistant", description: "AI Doctor Chat" },
                    { to: "/dashboard/user/appointments", title: "Appointments", description: "Upcoming appointments with doctors." },
                    { to: "/dashboard/user/lifestyle-tracker", title: "Lifestyle Tracker", description: "Track users' daily habits." },
                    { to: "/dashboard/user/medical-history", title: "Medical History", description: "Upload and view reports or prescriptions." },
                    { to: "/dashboard/user/notifications", title: "Notifications/Reminders", description: "Medication reminders and Alerts." },
                    { to: "/dashboard/user/settings", title: "Settings", description: "Manage your account settings." },
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

const Settings = () => {
    const { darkTheme } = useContext(AppContext);

    return (
        <div className={`p-4 rounded shadow ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
            <h2 className="text-2xl font-semibold mb-2">Settings</h2>
            <p>Manage your account settings here.</p>
        </div>
    );
};

export default UserDashboard;
