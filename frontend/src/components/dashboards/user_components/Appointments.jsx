import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FaListUl } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { AppContext } from '../../../AppProvider';

const backendURL = "https://personalized-health-companion-backend.vercel.app";

const Appointments = () => {
    const [view, setView] = useState('list');
    const { darkTheme } = useContext(AppContext);

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get(`${backendURL}/dashboard/appointments/user`, { withCredentials: true });
                setAppointments(data.appointments);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

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
                {appointments.map((appointment) => (
                    <div
                        key={appointment._id}
                        className={`w-full flex flex-wrap gap-2 justify-between items-center p-4 border rounded transition duration-300 ${darkTheme ? 'border-gray-700 hover:shadow-gray-700' : 'border-gray-300 hover:shadow-lg'
                            }`}
                    >
                        <div>
                            <p><strong>Date:</strong> {new Date(appointment.dateTime).toLocaleDateString()} {appointment.date}</p>
                            <p><strong>Doctor:</strong> {appointment.doctor.fullName}</p>
                        </div>
                        {appointment.status === 'completed' ? (
                            <p><strong>Prescription:</strong> {appointment.prescription}</p>
                        ) : (
                            appointment.status === 'scheduled' ? (
                                <div className='flex gap-2'>
                                    <button onClick={() => joinChat(appointment._id, appointment.doctor.doctorId)}
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
                                <p className="text-red-500 capitalize"><strong>{appointment.status}</strong></p>
                            )
                        )}
                    </div>
                ))}
                {!appointments.length && <p>No appointments available.</p>}
            </div>
        </div>
    );
};

export default Appointments;