import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaListUl } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

const Appointments = () => {
    const [view, setView] = useState('list')

    const [appointments, setAppointments] = useState([
        {
            id: 1,
            date: '2023-10-01',
            doctor: 'Dr. Smith',
            attended: true,
            available: false,
            prescription: 'Take 1 tablet daily',
        },
        {
            id: 2,
            date: '2023-11-15',
            doctor: 'Dr. Johnson',
            attended: false,
            available: true,
            prescription: '',
        },
    ]);

    const navigate = useNavigate();

    const bookNewAppointment = () => {
        // Logic to book a new appointment
        navigate('/dashboard/user/doctor-consultation?tab=book-appointment')
    };

    const joinAppointment = (id) => {
        // Logic to join an upcoming appointment
        window.open(`/user/video-call/${id}`, '_blank');
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <div className='flex justify-between items-center'>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Appointments</h2>
                    <p>Past and Upcoming appointments with doctors.</p>
                </div>

                <div className='space-x-4 text-xl'>
                    <button onClick={()=>setView('list')}><FaListUl /></button>
                    <button onClick={()=>setView('grid')}><IoGrid /></button>
                </div>

                <button
                    onClick={bookNewAppointment}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                >
                    Book New Appointment
                </button>
            </div>

            <div className={`mt-4 gap-4 ${view == "list"? "flex flex-col-reverse justify-between items-center" : "grid grid-cols-3"}`}>
                {appointments.map((appointment) => (
                    <div
                        key={appointment.id}
                        className="w-full flex flex-wrap gap-x-4 gap-y-2 justify-between items-center p-4 border rounded hover:shadow-lg transition duration-300"
                    >
                        <p><strong>Date:</strong> {appointment.date}</p>
                        <p><strong>Doctor:</strong> {appointment.doctor}</p>
                        {appointment.attended ? (
                            <p><strong>Prescription:</strong> {appointment.prescription}</p>
                        ) : (
                            appointment.available ? (
                                <button
                                    onClick={() => joinAppointment(appointment.id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                >
                                    Join Appointment
                                </button>
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