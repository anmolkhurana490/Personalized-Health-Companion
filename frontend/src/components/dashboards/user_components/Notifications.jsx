import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../../AppProvider';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Notifications = () => {
    const { profile, darkTheme } = useContext(AppContext);
    const [alert, setAlert] = useState("Your prescription is about to expire.");

    const [reminders, setReminders] = useState([
        { id: 1, title: "Take morning medication", time: "8:00 AM" },
        { id: 2, title: "Doctor appointment", time: "2:00 PM" },
        { id: 3, title: "Evening exercise", time: "6:00 PM" },
    ]);

    useEffect(() => {
        if (profile) {
            setAlert(profile.health_info.ai_generated.health_alert.alert);
        }
    }, [profile]);

    return (
        <div>
            <div className={`p-4 rounded shadow ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
                <h2 className="text-2xl font-semibold mb-2">Notifications/Reminders</h2>
                <p>Medication reminders and Alerts.</p>
            </div>
            <div className="mt-4 space-y-4">
                {alert && (
                    <div>
                        <h3 className={`text-xl font-semibold mt-6 mb-2 ${darkTheme ? 'text-gray-100' : 'text-gray-800'}`}>Alerts</h3>

                        <div className={`p-4 rounded shadow ${darkTheme ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
                            {alert}
                        </div>
                    </div>
                )}

                <div>
                    <h3 className={`text-xl font-semibold mb-2 ${darkTheme ? 'text-gray-100' : 'text-gray-800'}`}>Reminders</h3>
                    <ul className="space-y-4">
                        {reminders.map((reminder) => (
                            <li
                                key={reminder.id}
                                className={`p-4 rounded shadow flex justify-between items-center ${darkTheme ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800'}`}
                            >
                                <div>
                                    <h4 className="font-medium">{reminder.title}</h4>
                                    <p className="text-sm">{reminder.time}</p>
                                </div>
                                <button
                                    className={`px-3 py-1 rounded ${darkTheme ? 'bg-red-600 text-white' : 'bg-red-500 text-white'} hover:opacity-90`}
                                >
                                    Dismiss
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notifications;