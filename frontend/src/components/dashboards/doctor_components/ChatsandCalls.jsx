import React, { useState } from 'react';
import { IoArrowBackOutline } from "react-icons/io5";

const chatsAndCalls = () => {
    const [selectedPatient, setSelectedPatient] = useState(null)

    const patients = [
        { id: 1, name: "John Doe", lastChat: "2 hours ago", avatar: "https://via.placeholder.com/40" },
        { id: 2, name: "Jane Smith", lastChat: "1 day ago", avatar: "https://via.placeholder.com/40" },
        { id: 3, name: "Alice Johnson", lastChat: "3 days ago", avatar: "https://via.placeholder.com/40" },
    ];

    return (
        <div className="h-screen">
            {!selectedPatient ?
                <PatientList patients={patients} setSelectedPatient={setSelectedPatient} />
                : <ChatWindow patient={selectedPatient} setSelectedPatient={setSelectedPatient} />
            }
        </div>
    );
};


const PatientList = ({ patients, setSelectedPatient }) => {
    return (
        <div>
            {/* Sidebar for Patient List */}
            <div className="bg-gray-100 p-4 border-r overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Patients</h2>
                <ul>
                    {patients.map((patient) => (
                        <li key={patient.id} className="flex items-center justify-between w-full p-2 mb-2 bg-white rounded shadow">
                            <div className='flex'>
                                <img
                                    src={patient.avatar}
                                    alt={patient.name}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className="font-medium">{patient.name}</p>
                                    <p className="text-sm text-gray-500">Last chat: {patient.lastChat}</p>
                                </div>
                            </div>


                            <div className='space-x-2'>
                                <button onClick={() => setSelectedPatient(patient)} className="cursor-pointer hover:bg-green-800 bg-green-500 text-white px-4 py-2 rounded">Chat</button>
                                <button onClick={() => setSelectedPatient(patient)} className="cursor-pointer hover:bg-blue-800 bg-blue-500 text-white px-4 py-2 rounded">Video Call</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const ChatWindow = ({ patient, setSelectedPatient }) => {
    return (
        <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 bg-white border-b flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setSelectedPatient(null)}
                        className="bg-gray-200 text-gray-700 p-2 rounded-full shadow hover:bg-gray-300"
                    >
                        <IoArrowBackOutline />
                    </button>

                    <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <h2 className="text-lg font-semibold">Chat with {patient.name}</h2>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                    Start Video Call
                </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {/* Example Messages */}
                <div className="mb-4">
                    <p className="bg-blue-100 p-2 rounded w-max">Hello, how can I help you?</p>
                    <p className="text-sm text-gray-500 mt-1">10:00 AM</p>
                </div>
                <div className="mb-4 text-right">
                    <p className="bg-green-100 p-2 rounded w-max ml-auto">I need a prescription for my headache.</p>
                    <p className="text-sm text-gray-500 mt-1">10:05 AM</p>
                </div>
                {/* Add more messages here */}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t flex items-center">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border rounded p-2 mr-2"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                    Send
                </button>
            </div>
        </div>
    )
}

export default chatsAndCalls;