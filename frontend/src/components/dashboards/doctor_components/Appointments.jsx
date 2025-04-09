import React, { useContext, useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AppContext } from '../../../AppProvider';
import axios from 'axios';

import 'react-tabs/style/react-tabs.css';
import '../../styles.css';

const Appointments = () => {
    const { darkTheme } = useContext(AppContext);
    const [activeTab, setActiveTab] = React.useState('upcoming');

    const [appointments, setAppointments] = useState([]);

    useEffect(async () => {
        const { data } = await axios.get(`${backendURL}/appointments/doctor`, { withCredentials: true });
        setAppointments(data.appointments);
    }, []);

    const filteredAppointments = appointments.filter(appointment =>
        appointment.type === activeTab
    );

    const options = ["upcoming", "past"];

    return (
        <div
            className={`p-6 rounded-lg shadow-md ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"}`}
        >
            <h2 className="text-2xl font-semibold mb-6">Appointments Manager</h2>

            <Tabs selectedIndex={options.indexOf(activeTab)} onSelect={(index) => setActiveTab(options[index])}>
                <TabList className="flex w-full mb-4 font-semibold">
                    {options.map((option, index) => (
                        <Tab
                            key={index}
                            className={`role-tab flex-grow text-center py-2 cursor-pointer ${darkTheme ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-900"} hover:bg-blue-500 hover:text-white`}
                        >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </Tab>
                    ))}
                </TabList>

                {options.map((option, index) => (
                    <TabPanel key={index}>
                        <FilteredAppointments appointments={filteredAppointments} activeTab={option} darkTheme={darkTheme} />
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

const FilteredAppointments = ({ appointments, activeTab, darkTheme }) => {
    if (appointments.length === 0) {
        return <p>No appointments available.</p>;
    }

    return (
        <div className="space-y-4">
            {appointments.map(appointment => (
                <div
                    key={appointment.id}
                    className={`flex flex-wrap justify-between items-center gap-4 p-4 rounded shadow ${darkTheme ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"} md:grid-cols-2 lg:grid-cols-4`}
                >
                    <p><strong>Patient:</strong> {appointment.patient}</p>
                    <p><strong>Date:</strong> {appointment.date}</p>

                    {appointment.time && <p><strong>Time:</strong> {appointment.time}</p>}
                    {appointment.mode && <p><strong>Mode:</strong> {appointment.mode}</p>}
                    {appointment.prescription && <p><strong>Prescription:</strong> {appointment.prescription}</p>}

                    <div className="mt-2 flex flex-wrap gap-2">
                        {activeTab === 'upcoming' && (
                            <>
                                <button className={`px-4 py-2 rounded ${darkTheme ? "bg-blue-500 text-white" : "bg-blue-500 text-white"} hover:bg-blue-600`}>Join Call</button>
                                <button className={`px-4 py-2 rounded ${darkTheme ? "bg-green-500 text-white" : "bg-green-500 text-white"} hover:bg-green-600`}>Chat</button>
                                <button className={`px-4 py-2 rounded ${darkTheme ? "bg-gray-600 text-gray-100" : "bg-gray-300 text-gray-900"} hover:bg-gray-400`}>View Profile</button>
                                <button className={`px-4 py-2 rounded ${darkTheme ? "bg-red-600 text-gray-100" : "bg-red-300 text-gray-900"} hover:bg-red-400`}>Cancel</button>
                            </>
                        )}
                        {activeTab === 'past' && (
                            <button className={`px-4 py-2 rounded ${darkTheme ? "bg-gray-600 text-gray-100" : "bg-gray-300 text-gray-900"} hover:bg-gray-400`}>View Details</button>
                        )}
                    </div>
                </div>
            ))}
            {!appointments.length && <p>No appointments available.</p>}
        </div>
    );
};

export default Appointments;