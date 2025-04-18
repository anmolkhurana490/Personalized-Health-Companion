import React, { use, useContext, useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AppContext } from '../../../AppProvider';
import axios from 'axios';

import 'react-tabs/style/react-tabs.css';
import '../../styles.css';

const backendURL = "https://personalized-health-companion-backend.vercel.app";

const Appointments = () => {
    const { darkTheme } = useContext(AppContext);
    const [activeTab, setActiveTab] = React.useState('upcoming');

    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const { data } = await axios.get(`${backendURL}/dashboard/appointments/doctor`, { withCredentials: true });
            setAppointments(data.appointments);
        };
        fetchAppointments();
    }, []);

    useEffect(() => {
        const filtered = appointments?.filter(appointment => {
            if (activeTab === 'upcoming') {
                return new Date(appointment.dateTime) > new Date();
            } else if (activeTab === 'past') {
                return new Date(appointment.dateTime) < new Date();
            }
            return false;
        });
        setFilteredAppointments(filtered);
    }, [appointments, activeTab]);

    const cancelAppointment = async (appointmentId) => {
        try {
            await axios.put(`${backendURL}/dashboard/appointments/cancel?id=${appointmentId}`, { withCredentials: true });
            setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
        } catch (error) {
            console.error("Error cancelling appointment:", error);
        }
    };

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
                        <FilteredAppointments appointments={filteredAppointments} activeTab={option} darkTheme={darkTheme} cancelAppointment={cancelAppointment} />
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

const FilteredAppointments = ({ appointments, activeTab, darkTheme, cancelAppointment }) => {
    if (appointments?.length === 0) {
        return <p>No appointments available.</p>;
    }

    return (
        <div className="space-y-4">
            {appointments?.map(appointment => (
                <div
                    key={appointment._id}
                    className={`flex flex-wrap justify-between items-center gap-4 p-4 rounded shadow ${darkTheme ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"} md:grid-cols-2 lg:grid-cols-4`}
                >
                    <p><strong>Patient:</strong> {appointment.user.fullName}</p>
                    <p><strong>Date:</strong> {new Date(appointment.dateTime).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {new Date(appointment.dateTime).toLocaleTimeString()}</p>

                    {appointment.type && <p><strong>Mode:</strong> {appointment.type}</p>}
                    {appointment.reason && <p><strong>Reason:</strong> {appointment.reason}</p>}

                    <div className="mt-2 flex flex-wrap gap-2 items-center">
                        {activeTab === 'upcoming' && (
                            <>
                                <button className={`px-4 py-2 rounded ${darkTheme ? "bg-blue-500 text-white" : "bg-blue-500 text-white"} hover:bg-blue-600`}>Join Call</button>
                                <button className={`px-4 py-2 rounded ${darkTheme ? "bg-green-500 text-white" : "bg-green-500 text-white"} hover:bg-green-600`}>Chat</button>
                                <button className={`px-4 py-2 rounded ${darkTheme ? "bg-gray-600 text-gray-100" : "bg-gray-300 text-gray-900"} hover:bg-gray-400`}>View Profile</button>
                                <button onClick={() => cancelAppointment(appointment._id)} className={`px-4 py-2 rounded ${darkTheme ? "bg-red-600 text-gray-100" : "bg-red-300 text-gray-900"} hover:bg-red-400`}>Cancel</button>
                            </>
                        )}
                        {activeTab === 'past' && (
                            <>
                                {appointment.prescription && <button className={`px-4 py-2 rounded ${darkTheme ? "bg-green-600 text-gray-100" : "bg-green-300 text-gray-900"} hover:bg-gray-400`}>Prescription</button>}
                                <button className={`px-4 py-2 rounded ${darkTheme ? "bg-gray-600 text-gray-100" : "bg-gray-300 text-gray-900"} hover:bg-gray-400`}>View Details</button>
                            </>
                        )}
                    </div>
                </div>
            ))
            }
            {!appointments?.length && <p>No appointments available.</p>}
        </div >
    );
};

export default Appointments;