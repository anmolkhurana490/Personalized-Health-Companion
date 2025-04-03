import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import '../../styles.css'

const Appointments = () => {
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

    const options = ["upcoming", "past", "requests"]

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Appointments Manager</h2>

            <Tabs selectedIndex={options.indexOf(activeTab)} onSelect={(index) => setActiveTab(options[index])}>
                <TabList className="flex w-full mb-4 font-semibold">
                    <Tab className="role-tab flex-grow text-center py-1">Upcoming</Tab>
                    <Tab className="role-tab flex-grow text-center py-1">Past</Tab>
                    <Tab className="role-tab flex-grow text-center py-1">Requests</Tab>
                </TabList>

                <TabPanel><FilteredAppointments appointments={filteredAppointments} activeTab={'upcoming'} /></TabPanel>
                <TabPanel><FilteredAppointments appointments={filteredAppointments} activeTab={'past'} /></TabPanel>
                <TabPanel><FilteredAppointments appointments={filteredAppointments} activeTab={'requests'} /></TabPanel>
            </Tabs>
        </div>
    );
};

const FilteredAppointments = ({ appointments, activeTab }) => {
    if (appointments.length === 0) {
        return <p>No appointments available.</p>;
    }

    return (
        <div className="space-y-4">
            {appointments.map(appointment => (
                <div key={appointment.id} className="grid justify-between items-center p-4 bg-gray-100 rounded shadow" style={{ gridTemplateColumns: `repeat(${Object.keys(appointment).length}, 1fr)` }}>

                    <p><strong>Patient:</strong> {appointment.patient}</p>
                    <p><strong>Date:</strong> {appointment.date}</p>

                    {appointment.time && <p><strong>Time:</strong> {appointment.time}</p>}
                    {appointment.mode && <p><strong>Mode:</strong> {appointment.mode}</p>}
                    {appointment.prescription && <p><strong>Prescription:</strong> {appointment.prescription}</p>}

                    <div className="mt-2 flex justify-evenly col-span-2">
                        {activeTab === 'upcoming' && (
                            <>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded">Join Call</button>
                                <button className="px-4 py-2 bg-green-500 text-white rounded">Chat</button>
                                <button className="px-4 py-2 bg-gray-300 rounded">View Profile</button>
                            </>
                        )}
                        {activeTab === 'past' && (
                            <button className="px-4 py-2 bg-gray-300 rounded">View Details</button>
                        )}
                        {activeTab === 'requests' && (
                            <>
                                <button className="px-4 py-2 bg-green-500 text-white rounded">Accept</button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded">Reject</button>
                            </>
                        )}
                    </div>
                </div>
            ))
            }
        </div >
    );
}


export default Appointments;