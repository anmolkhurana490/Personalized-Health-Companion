import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AppContext } from '../../../AppProvider';

import 'react-tabs/style/react-tabs.css';
import '../../styles.css';

const Appointments = () => {
    const { darkTheme } = useContext(AppContext);
    const [activeTab, setActiveTab] = React.useState('upcoming');

    const appointments = [
        {
            id: 1,
            patient: 'John Doe',
            date: '2023-10-15',
            time: '10:00 AM',
            mode: 'Video',
            type: 'upcoming',
        },
        {
            id: 2,
            patient: 'Jane Smith',
            date: '2023-09-20',
            prescription: 'Provided',
            type: 'past',
        },
        {
            id: 3,
            patient: 'Alice Brown',
            date: '2023-10-18',
            time: '2:00 PM',
            type: 'requests',
        },
        {
            id: 4,
            patient: 'Michael Johnson',
            date: '2023-10-20',
            time: '11:00 AM',
            mode: 'In-person',
            type: 'upcoming',
        },
        {
            id: 5,
            patient: 'Emily Davis',
            date: '2023-09-15',
            prescription: 'Not Provided',
            type: 'past',
        },
        {
            id: 6,
            patient: 'Chris Wilson',
            date: '2023-10-22',
            time: '4:00 PM',
            type: 'requests',
        },
        {
            id: 7,
            patient: 'Sophia Martinez',
            date: '2023-10-25',
            time: '9:00 AM',
            mode: 'Video',
            type: 'upcoming',
        },
        {
            id: 8,
            patient: 'Daniel Lee',
            date: '2023-09-10',
            prescription: 'Provided',
            type: 'past',
        },
        {
            id: 9,
            patient: 'Olivia Garcia',
            date: '2023-10-28',
            time: '3:00 PM',
            type: 'requests',
        },
        {
            id: 10,
            patient: 'Liam Hernandez',
            date: '2023-10-30',
            time: '1:00 PM',
            mode: 'In-person',
            type: 'upcoming',
        },
    ];

    const filteredAppointments = appointments.filter(appointment =>
        appointment.type === activeTab
    ).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    const options = ["upcoming", "past", "requests"];

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
                    className={`grid gap-4 p-4 rounded shadow ${darkTheme ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"} md:grid-cols-2 lg:grid-cols-4`}
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
                            </>
                        )}
                        {activeTab === 'past' && (
                            <button className={`px-4 py-2 rounded ${darkTheme ? "bg-gray-600 text-gray-100" : "bg-gray-300 text-gray-900"} hover:bg-gray-400`}>View Details</button>
                        )}
                        {activeTab === 'requests' && (
                            <>
                                <button className={`px-4 py-2 rounded ${darkTheme ? "bg-green-500 text-white" : "bg-green-500 text-white"} hover:bg-green-600`}>Accept</button>
                                <button className={`px-4 py-2 rounded ${darkTheme ? "bg-red-500 text-white" : "bg-red-500 text-white"} hover:bg-red-600`}>Reject</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Appointments;