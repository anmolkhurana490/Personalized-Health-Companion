import React, { useState, useContext, useEffect } from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import { AppContext } from '../../../AppProvider';
import axios from 'axios';

const backendURL = "https://personalized-health-companion-backend.vercel.app";

const ChatsAndCalls = () => {
    const { darkTheme } = useContext(AppContext);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState([])

    // const patients = [
    //     { id: 1, name: "John Doe", lastChat: "2 hours ago", avatar: "https://via.placeholder.com/40" },
    //     { id: 2, name: "Jane Smith", lastChat: "1 day ago", avatar: "https://via.placeholder.com/40" },
    //     { id: 3, name: "Alice Johnson", lastChat: "3 days ago", avatar: "https://via.placeholder.com/40" },
    // ];

    useEffect(() => {
        const fetchPatients = async () => {
            const { data } = await axios.get(`${backendURL}/dashboard/appointments/consulted-patients`, { withCredentials: true });
            setPatients(data.consultedPatients);
        }
        fetchPatients();
    }, [])

    return (
        <div className={`h-screen flex flex-col ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
            {!selectedPatient ? (
                <PatientList patients={patients} setSelectedPatient={setSelectedPatient} darkTheme={darkTheme} />
            ) : (
                <ChatWindow patient={selectedPatient} setSelectedPatient={setSelectedPatient} darkTheme={darkTheme} />
            )}
        </div>
    );
};

const PatientList = ({ patients, setSelectedPatient, darkTheme }) => {
    return (
        <div className="flex flex-col h-full">
            <div className={`p-4 border-b ${darkTheme ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-900"}`}>
                <h2 className="text-lg font-semibold">Chat/Call with Patients</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-4">
                    {patients.map((patient) => (
                        <li
                            key={patient.user.id}
                            className={`flex items-center justify-between p-4 rounded shadow ${darkTheme ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}
                        >
                            <div className="flex items-center">
                                <img
                                    src={`/profilePicture/${patient.user.profilePicture}`}
                                    alt={patient.user.personal_info.fullName}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className="font-medium">{patient.user.personal_info.fullName}</p>
                                    <p className="text-sm text-gray-500">Last chat: {new Date(patient.dateTime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                </div>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => setSelectedPatient(patient)}
                                    className={`px-4 py-2 rounded ${darkTheme ? "bg-green-500 text-white" : "bg-green-500 text-white"} hover:bg-green-600`}
                                >
                                    Chat
                                </button>
                                <button
                                    onClick={() => setSelectedPatient(patient)}
                                    className={`px-4 py-2 rounded ${darkTheme ? "bg-blue-500 text-white" : "bg-blue-500 text-white"} hover:bg-blue-600`}
                                >
                                    Video Call
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const ChatWindow = ({ patient, setSelectedPatient, darkTheme }) => {
    return (
        <div className="flex flex-col h-full">
            <div className={`p-4 border-b flex items-center justify-between ${darkTheme ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setSelectedPatient(null)}
                        className={`p-2 rounded-full shadow ${darkTheme ? "bg-gray-600 text-gray-100" : "bg-gray-200 text-gray-700"} hover:bg-gray-400`}
                    >
                        <IoArrowBackOutline />
                    </button>
                    <img
                        src={`/profilePicture/${patient.user.profilePicture}`}
                        alt={patient.user.personal_info.fullName}
                        className="w-10 h-10 rounded-full"
                    />
                    <h2 className="text-lg font-semibold">Chat with {patient.user.personal_info.fullName}</h2>
                </div>
                <button
                    className={`px-4 py-2 rounded shadow ${darkTheme ? "bg-blue-500 text-white" : "bg-blue-500 text-white"} hover:bg-blue-600`}
                >
                    Start Video Call
                </button>
            </div>
            <div className={`flex-1 p-4 overflow-y-auto ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                <div className="mb-4">
                    <p className={`p-2 rounded w-max ${darkTheme ? "bg-blue-600 text-white" : "bg-blue-100 text-gray-900"}`}>Hello, how can I help you?</p>
                    <p className="text-sm text-gray-500 mt-1">10:00 AM</p>
                </div>
                <div className="mb-4 text-right">
                    <p className={`p-2 rounded w-max ml-auto ${darkTheme ? "bg-green-600 text-white" : "bg-green-100 text-gray-900"}`}>I need a prescription for my headache.</p>
                    <p className="text-sm text-gray-500 mt-1">10:05 AM</p>
                </div>
            </div>
            <div className={`p-4 border-t flex items-center ${darkTheme ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    className={`flex-1 border rounded p-2 mr-2 ${darkTheme ? "bg-gray-600 text-gray-100" : "bg-gray-200 text-gray-900"}`}
                />
                <button
                    className={`px-4 py-2 rounded shadow ${darkTheme ? "bg-blue-500 text-white" : "bg-blue-500 text-white"} hover:bg-blue-600`}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatsAndCalls;