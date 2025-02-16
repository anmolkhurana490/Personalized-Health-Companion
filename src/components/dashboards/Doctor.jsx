import React, { useContext, useEffect, useState } from 'react';
import { FaUserDoctor } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import form_data from '../Auth_Components/formComponent_data';
import axios from 'axios';

const DoctorDashboardRoutes = () => {
    const { profile, setProfile } = useContext(AppContext);

    return (
        <Routes>
            <Route path="" element={<MainDashboard profile={profile} />} />
            <Route path="profile" element={<Profile profile={profile} setProfile={setProfile} />} />
            <Route path="patients" element={<Patients profile={profile} />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="chats" element={<Chats />} />
            <Route path="reports" element={<Reports />} />
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

            <div className="min-h-screen w-full bg-gray-200 bg-opacity-70 rounded-lg flex">
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
                                <Link to="/dashboard/doctor/chats" className="hover:text-gray-400">Chats with Patients</Link>
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

                <main className="container mx-auto p-4">
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
                        <h3 className="text-lg font-semibold">Chats with Patients</h3>
                        <p className="mt-2">Real-time chat interface for patient interaction.</p>
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

const Profile = ({ profile, setProfile, currRole }) => {
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if (profile) {
            Object.keys(profile.personal_info).forEach(key => {
                setValue(`personal_info.${key}`, profile.personal_info[key]);
            });
            Object.keys(profile.professional_info).forEach(key => {
                setValue(`professional_info.${key}`, profile.professional_info[key]);
            });
            Object.keys(profile.availability).forEach(key => {
                setValue(`availability.${key}`, profile.availability[key]);
            });
            Object.keys(profile.optional).forEach(key => {
                setValue(`optional.${key}`, profile.optional[key]);
            });
        }
    }, [profile, setValue]);

    const onSubmit = async (data) => {
        const newProfileData = {
            ...profile,
            personal_info: {
                ...profile.personal_info,
                ...data.personal_info,
            },
            professional_info: {
                ...profile.professional_info,
                ...data.professional_info,
            },
            availability: {
                ...profile.availability,
                ...data.availability,
            },
            optional: {
                ...profile.optional,
                ...data.optional,
            },
        }

        try {
            const response = await axios.post('http://localhost:3000/dashboard/profile', { ...newProfileData, role: currRole }, {
                withCredentials: true
            });
            if (response.data.status === 'success') {
                setProfile(newProfileData);
                setEditMode(false);
            } else {
                console.log("Save Profile Failed:", response.data.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="max-h-screen overflow-auto custom-scrollbar bg-white rounded shadow p-4">
            <div className="w-full flex justify-between items-center p-4">
                <div>
                    <h2 className="text-2xl font-semibold">{profile?.personal_info?.fullName}</h2>
                    <p className="text-gray-600">{profile?.personal_info?.email}</p>
                    <button onClick={() => setEditMode(!editMode)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        {editMode ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                <img
                    src={`/profilePicture/${profile?.profilePicture}`}
                    alt="Not Found"
                    onError={(e) => { e.target.src = '/profilePicture/default-profile-picture.jpg'; }}
                    className="w-32 h-32 object-cover rounded-full"
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                {['personal_info', 'professional_info', 'availability', 'optional'].map((compKey, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-semibold my-4">{form_data['doctor'][compKey].title}</h3>

                        <div className='grid grid-cols-3 gap-x-10 gap-y-2'>
                            {Object.entries(form_data['doctor'][compKey].inputs).map(([inputName, inputData], idx) => (
                                inputData.type !== "file" && (
                                    <div key={idx} className="mb-4 relative">
                                        <label className="block text-gray-700">{inputData.label}:</label>
                                        {inputData.type === "select" ? (
                                            <select
                                                {...register(`${compKey}.${inputName}`, inputData.rules)}
                                                disabled={!editMode}
                                                className="w-full mt-1 p-2 border border-gray-300 rounded"
                                            >
                                                {inputData.options.map((option, i) => (
                                                    <option key={i} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={inputData.type}
                                                {...register(`${compKey}.${inputName}`, inputData.rules)}
                                                disabled={!editMode || inputData.disabled}
                                                className="w-full mt-1 p-2 border border-gray-300 rounded"
                                                placeholder={inputData.placeholder}
                                            />
                                        )}
                                        {errors[`${compKey}.${inputName}`] && <p className="text-red-500">{errors[`${compKey}.${inputName}`].message}</p>}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
                {editMode && <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-green-500 disabled:bg-green-700 text-white rounded hover:bg-green-600">Save Changes</button>}
            </form>
        </div>
    );
};

const Patients = ({ profile }) => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2>Patients</h2>
            <p>View and manage your patients here.</p>
        </div>
    );
};

const Appointments = () => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2>Appointments</h2>
            <p>Manage your appointments here.</p>
        </div>
    );
};

const Chats = () => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2>Chats</h2>
            <p>Chat with your patients here.</p>
        </div>
    );
};

const Reports = () => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2>Reports</h2>
            <p>Manage your reports and prescriptions here.</p>
        </div>
    );
};

const Analytics = () => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2>Analytics</h2>
            <p>View your analytics here.</p>
        </div>
    );
};

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