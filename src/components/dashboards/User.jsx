import React, { useContext, useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import { AppContext } from '../../AppProvider';
import { Link, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import form_data from '../Auth_Components/formComponent_data';
import axios from 'axios';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const UserDashboardRoutes = () => {
    const { profile, setProfile } = useContext(AppContext);

    return (
        <Routes>
            <Route path="" element={<MainDashboard profile={profile} />} />
            <Route path="profile" element={<Profile profile={profile} setProfile={setProfile} />} />
            <Route path="health-overview" element={<HealthOverview profile={profile} />} />
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

const Profile = ({ profile, setProfile, currRole }) => {
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if (profile) {
            Object.keys(profile.personal_info).forEach(key => {
                if (key === "dateOfBirth")
                    setValue(`personal_info.${key}`, profile.personal_info[key].substr(0, 10));
                else setValue(`personal_info.${key}`, profile.personal_info[key]);
            });
            Object.keys(profile.health_info).forEach(key => {
                setValue(`health_info.${key}`, profile.health_info[key]);
            });
            Object.keys(profile.emergency_contact).forEach(key => {
                setValue(`emergency_contact.${key}`, profile.emergency_contact[key]);
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
            health_info: {
                ...profile.health_info,
                ...data.health_info,
            },
            emergency_contact: {
                ...profile.emergency_contact,
                ...data.emergency_contact,
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
        <div className="max-h-full overflow-auto custom-scrollbar bg-white rounded shadow p-4">
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
                {['personal_info', 'health_info', 'emergency_contact'].map((compKey, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-semibold my-4">{form_data['user'][compKey].title}</h3>

                        <div className='grid grid-cols-3 gap-x-10 gap-y-2'>
                            {Object.entries(form_data['user'][compKey].inputs).map(([inputName, inputData], idx) => (
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
                            ))}
                        </div>
                    </div>
                ))}
                {editMode && <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-green-500 disabled:bg-green-700 text-white rounded hover:bg-green-600">Save Changes</button>}
            </form>
        </div>
    );
};

const HealthOverview = ({ profile }) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const [healthData, setHealthData] = useState({
        bloodGroup: 'Unknown',
        allergies: 'None',
        conditions: 'None',
        bmi: 0,
        heartRate: 72,
        steps: 5400,
        weightHistory: [],
        heartRateHistory: []
    });

    const user = {
        name: "Anmol Khurana",
        avatar: "https://via.placeholder.com/50",
        age: 22,
        bloodGroup: "B+",
    };

    const healthRecommendations = [
        { id: 1, tip: "Try to walk at least 10,000 steps a day for better heart health." },
        { id: 2, tip: "Stay hydrated! Drink at least 3 liters of water daily." },
        { id: 3, tip: "Reduce processed sugar intake to maintain a healthy BMI." },
    ];

    useEffect(() => {
        // BMI Calculation (Assuming height in meters and weight in kg)
        const height = profile?.health_info.height;
        const weight = profile?.health_info.weight;
        const bmi = (weight * 10000 / (height * height)).toFixed(1);

        const heartRate = profile?.health_info.heartRate;
        const bloodGroup = profile?.health_info.bloodGroup;
        const allergies = profile?.health_info.knownAllergies;
        const conditions = profile?.health_info.existingMedicalConditions;

        const weightHistory = profile?.health_info.weightHistory.map(({ weight, date }) => {
            return {
                weight,
                month: `${months[new Date(date).getMonth()]}`
            }
        })

        const heartRateHistory = profile?.health_info.heartRateLogs.map(({ weight, date }) => {
            return {
                "heart rate": heartRate,
                month: `${months[new Date(date).getMonth()]}`
            }
        })
        console.log(heartRateHistory)

        setHealthData((prev) => ({ ...prev, height, weight, bmi, heartRate, bloodGroup, allergies, conditions, weightHistory, heartRateHistory }));
    }, [profile]);

    return (
        <div className="max-h-full overflow-auto custom-scrollbar p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">Health Overview</h2>
            <p>Check your latest health statistics here.</p>

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 p-4">
                {/* Health Overview */}
                <div className="p-4">
                    <h3 className="text-xl font-semibold">🏥 Health Overview</h3>
                    <div>
                        <p><b>Height:</b> {healthData.height} cm</p>
                        <p><b>Weight:</b> {healthData.weight} kg</p>
                        <div className='space-x-2'>
                            <b>BMI:</b>
                            <span>{healthData.bmi}</span>
                            <span>({
                                healthData.bmi < 18.5 ? "Underweight" :
                                    healthData.bmi < 25 ? "Health Weight" :
                                        healthData.bmi < 30 ? "Overweight" :
                                            healthData.bmi >= 30 ? "Obesity"
                                                : "Unknown"
                            })</span>
                        </div>

                        <p><b>Heart Rate:</b> {healthData.heartRate} bpm</p>
                        <p><b>Steps Today:</b> {healthData.steps}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Steps Progress</h3>
                    <div>
                        <progress value={5400 / 10000} className="w-full" />
                        <div className="w-full flex justify-between relative">
                            <span>0</span>
                            <span>10000</span>
                        </div>
                    </div>
                </div>

                {/* Weight Progress */}
                {healthData.weightHistory && healthData.weightHistory.length > 0 && (<div className="p-4">
                    <h3 className="text-xl font-semibold">📊 Weight Progress</h3>
                    <div>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={healthData.weightHistory}>
                                <XAxis dataKey="month" />
                                <YAxis dataKey="weight" />
                                <Tooltip />
                                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>)}

                {healthData.heartRateHistory && healthData.heartRateHistory.length > 0 && (<div className="p-4">
                    <h3 className="text-xl font-semibold">📊 Heart Rate History</h3>
                    <div>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={healthData.heartRateHistory}>
                                <XAxis dataKey="month" />
                                <YAxis dataKey="heart rate" />
                                <Tooltip />
                                <Line type="monotone" dataKey="heart rate" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>)}

                {/* Medical Conditions */}
                <div className="p-4">
                    <h3 className="text-xl font-semibold">🏥 Medical Conditions</h3>
                    <div>
                        <p><b>Blood Group:</b> {healthData.bloodGroup}</p>
                        <p><b>Allergies:</b> {healthData.allergies || "None"}</p>
                        <p><b>Conditions:</b> {healthData.conditions || "None"}</p>
                    </div>
                </div>

                {/* Alerts & Reminders */}
                <div className="p-4">
                    <h3 className="text-xl font-semibold">🛑 Alerts & Reminders</h3>
                    <div>
                        <p><b>Next Checkup:</b> 15 Aug</p>
                        <p><b>Medicine:</b> Take Aspirin</p>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="text-xl font-semibold">Health Tips</h3>
                    <ul>
                        {healthRecommendations.map((tip) => (
                            <li key={tip.id} className="bg-gray-200 p-2 rounded-md my-2">{tip.tip}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const Appointments = () => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">Appointments</h2>
            <p>Upcoming appointments with doctors.</p>
        </div>
    );
};

const LifestyleTracker = () => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">Lifestyle Tracker</h2>
            <p>Track your daily habits here.</p>
        </div>
    );
};

const MedicalHistory = () => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">Medical History</h2>
            <p>Upload and view your medical reports or prescriptions here.</p>
        </div>
    );
};

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