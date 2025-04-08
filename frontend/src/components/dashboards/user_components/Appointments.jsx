import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaListUl } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { AppContext } from '../../../AppProvider';

const Appointments = () => {
    const [view, setView] = useState('list');
    const { darkTheme } = useContext(AppContext);

    const [appointments, setAppointments] = useState([
        {
            id: 1,
            date: '2023-10-01',
            doctorId: 1,
            doctor: 'Dr. John Doe',
            attended: true,
            available: false,
            prescription: 'Take 1 tablet daily',
        },
        {
            id: 2,
            date: '2023-11-15',
            doctorId: 2,
            doctor: 'Dr. Jane Smith',
            attended: false,
            available: true,
            prescription: '',
        },
    ]);

    const navigate = useNavigate();

    const bookNewAppointment = () => {
        navigate('/dashboard/user/doctor-consultation?tab=book-appointment');
    };
    const joinChat = (id, doctorId) => {
        navigate('/dashboard/user/doctor-consultation?tab=doctor-chat', { state: { id, doctorId } });
    };

    const joinVideoCall = (id) => {
        window.open(`/user/video-call/${id}`, '_blank');
    };

    return (
        <div className={`p-4 rounded shadow ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <div className="flex flex-wrap justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Appointments</h2>
                    <p>Past and Upcoming appointments with doctors.</p>
                </div>

                <div className="flex space-x-4 text-xl">
                    <button
                        onClick={() => setView('list')}
                        className={`p-2 rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                    >
                        <FaListUl />
                    </button>
                    <button
                        onClick={() => setView('grid')}
                        className={`p-2 rounded ${view === 'grid' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                    >
                        <IoGrid />
                    </button>
                </div>

                <button
                    onClick={bookNewAppointment}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                >
                    Book New Appointment
                </button>
            </div>

            <div className={`mt-4 gap-4 ${view === 'list' ? 'flex flex-col' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                {appointments.sort((a, b) => new Date(b.date) - new Date(a.date)).map((appointment) => (
                    <div
                        key={appointment.id}
                        className={`w-full flex flex-wrap gap-2 justify-between items-center p-4 border rounded transition duration-300 ${darkTheme ? 'border-gray-700 hover:shadow-gray-700' : 'border-gray-300 hover:shadow-lg'
                            }`}
                    >
                        <div>
                            <p><strong>Date:</strong> {appointment.date}</p>
                            <p><strong>Doctor:</strong> {appointment.doctor}</p>
                        </div>
                        {appointment.attended ? (
                            <p><strong>Prescription:</strong> {appointment.prescription}</p>
                        ) : (
                            appointment.available ? (
                                <div className='flex gap-2'>
                                    <button onClick={() => joinChat(appointment.id, appointment.doctorId)}
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                                    >
                                        Chat
                                    </button>
                                    <button
                                        onClick={() => joinVideoCall(appointment.id)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                    >
                                        Video Call
                                    </button>
                                </div>
                            ) : (
                                <p className="text-red-500"><strong>Missed</strong></p>
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Appointments;