import React, { useEffect, useState, useContext, useRef } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { IoArrowBackOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../../AppProvider';
import axios from 'axios';

import 'react-tabs/style/react-tabs.css';
import '../../styles.css';
import { io } from "socket.io-client";

const backendURL = "https://personalized-health-companion-backend.vercel.app";
// const backendURL = "http://localhost:3000";

const DoctorConsultation = () => {
    const location = useLocation();
    const { id: appointmentId, doctorId } = location.state || {};
    const { darkTheme } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState("doctor-chat");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab) setActiveTab(tab);
    }, [location]);

    const options = ["doctor-chat", "video-call", "book-appointment"];

    return (
        <div className={`max-h-full overflow-auto custom-scrollbar rounded shadow p-4 ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <div className='mb-8'>
                <h2 className="text-2xl font-semibold mb-2">Doctor Consultation</h2>
                <p>Chat, Video Call, Book Appointment</p>
            </div>

            <Tabs selectedIndex={options.indexOf(activeTab)} onSelect={(index) => setActiveTab(options[index])}>
                <TabList className="flex w-full mb-4 font-semibold">
                    <Tab className={`role-tab flex-grow text-center py-1 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>Chat with Doctor</Tab>
                    <Tab className={`role-tab flex-grow text-center py-1 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>Video Call</Tab>
                    <Tab className={`role-tab flex-grow text-center py-1 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>Book New Appointment</Tab>
                </TabList>

                <TabPanel><ChatWithDoctor darkTheme={darkTheme} preSelectedDoctorId={doctorId} appointmentId={appointmentId} /></TabPanel>
                <TabPanel><VideoCallDoctor darkTheme={darkTheme} /></TabPanel>
                <TabPanel><BookAppointment darkTheme={darkTheme} /></TabPanel>
            </Tabs>
        </div>
    );
};

const ChatWithDoctor = ({ darkTheme, preSelectedDoctorId, appointmentId }) => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [consultedDoctors, setConsultedDoctors] = useState([]);

    useEffect(() => {
        const fetchConsultedDoctors = async () => {
            try {
                const response = await axios.get(`${backendURL}/dashboard/appointments/consulted-doctors`, { withCredentials: true });
                setConsultedDoctors(response.data.consultedDoctors);
            } catch (error) {
                console.error('Error fetching consulted doctors:', error);
            }
        }

        fetchConsultedDoctors();
    }, []);

    // const assignedDoctors = [
    //     { id: 1, name: "Dr. John Doe" },
    //     { id: 2, name: "Dr. Jane Smith" },
    // ];

    useEffect(() => {
        if (preSelectedDoctorId) {
            const doctor = consultedDoctors.find((doc) => doc.id === preSelectedDoctorId);
            if (doctor) setSelectedDoctor(doctor);
        }
    }, [preSelectedDoctorId, consultedDoctors]);

    const onBack = () => setSelectedDoctor(null);

    return (
        <div className={`h-[50vh] rounded-lg p-4 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {selectedDoctor ? (
                <Chat selectedDoctor={selectedDoctor} onBack={onBack} darkTheme={darkTheme} />
            ) : (
                <>
                    <p className=''>Please select a doctor to start chatting.</p>
                    {consultedDoctors?.map((doc) => (
                        <div key={doc.doctor.id} className={`flex items-center gap-4 p-2 mb-2 rounded shadow ${darkTheme ? 'bg-gray-600' : 'bg-white'}`}>
                            <img src={`/profilePicture/${doc.doctor.profilePicture}`} alt="Doctor Profile" className="w-10 h-10 rounded-full object-cover" />
                            <div className="flex-grow">
                                <p className="text-lg font-semibold">{doc.doctor.personal_info.fullName}</p>
                                <p className={`text-sm ${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>{doc.doctor.professional_info.speciality}</p>
                            </div>
                            <button onClick={() => setSelectedDoctor(doc.doctor)} className="bg-blue-500 text-white px-4 py-2 rounded">Chat</button>
                        </div>
                    ))}
                </>
            )
            }
        </div >
    );
};

const Chat = ({ selectedDoctor, onBack, darkTheme }) => {
    const [messages, setMessages] = useState([
        { sender: "doctor", text: "Hello, how can I assist you today?" },
        { sender: "user", text: "I have been experiencing headaches lately." },
    ]);

    const socketRef = useRef(null);
    const { profile } = useContext(AppContext);
    const [remoteId, setRemoteId] = useState(null);
    const [chatId, setChatId] = useState(null);

    const [input, setInput] = useState("");

    const fetchMessages = async () => {
        const savedMessages = await axios.get(`${backendURL}/dashboard/chats/`, {
            params: { user: profile._id, doctor: selectedDoctor.id },
            withCredentials: true
        });
        setMessages(savedMessages.data.chats.messages);
        setChatId(savedMessages.data.chats._id);
    }

    useEffect(() => {
        socketRef.current = io(backendURL, {
            path: '/chat',
            withCredentials: true,
        });

        if (selectedDoctor) {
            socketRef.current.emit('join-user', { user: profile._id, remote: selectedDoctor.id });
            fetchMessages();
        }

        socketRef.current.on('user-joined', (user) => {
            setRemoteId(user.id);
        });

        socketRef.current.on('receive-message', ({ from, message }) => {
            if (remoteId === from) setMessages((prev) => [...prev, { sender: 'doctor', text: message }]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [selectedDoctor]);

    const sendMessage = async () => {
        if (input.trim()) {
            socketRef.current.emit('send-message', { from: socketRef.current.id, to: remoteId, message: input });

            await axios.post(`${backendURL}/dashboard/chats/`, { chatId, message: input }, { withCredentials: true });

            setMessages((prev) => [...prev, { sender: "user", text: input }]);
            setInput("");
        }
    };

    return (
        <>
            <div className={`flex gap-8 items-center mb-2 px-4 py-2 border rounded shadow ${darkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}>
                <button onClick={onBack} className="mb-2 text-blue-500 hover:bg-gray-300 p-2 rounded-full">
                    <IoArrowBackOutline className='text-xl' />
                </button>

                <div className="flex items-center gap-4">
                    <img src={`/profilePicture/${selectedDoctor.profilePicture}`} alt="Doctor Profile" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-grow">
                        <p className="text-lg font-semibold">{selectedDoctor.personal_info.fullName}</p>
                        <p className="text-sm text-gray-500">{selectedDoctor.professional_info.speciality}</p>
                    </div>
                </div>
            </div>

            <div className={`h-[30vh] overflow-y-auto custom-scrollbar p-2 border rounded ${darkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}>
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                        <span className={`inline-block px-3 py-1 rounded-md ${msg.sender === "user" ? "bg-blue-500 text-white" : darkTheme ? "bg-gray-600" : "bg-gray-300"}`}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <div className="mt-2 flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className={`w-full p-2 border rounded-l ${darkTheme ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">Send</button>
            </div>
        </>
    );
};

const VideoCallDoctor = ({ darkTheme }) => {
    const [scheduledAppointments, setScheduledAppointments] = useState([]);
    // const scheduledAppointments = [
    //     { id: 1, doctor: { name: "Dr. John Doe" }, dateTime: "2025-02-25T10:00:00" },
    //     { id: 2, doctor: { name: "Dr. Jane Smith" }, dateTime: "2025-02-22T16:41:00" },
    // ];

    useEffect(() => {
        async function fetchScheduledAppointments() {
            try {
                const response = await axios.get(`${backendURL}/dashboard/appointments/user/scheduled`, { withCredentials: true });
                setScheduledAppointments(response.data.appointments);
                console.log(response.data.appointments);
            } catch (error) {
                console.error("Error fetching scheduled appointments:", error);
            }
        }
        fetchScheduledAppointments();
    }, []);

    const startCall = (id) => {
        window.open(`/user/video-call/${id}`, '_blank');
    };

    return (
        <div className={`h-[50vh] overflow-y-auto custom-scrollbar rounded-lg p-4 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <label className="block mb-2">Select Appointment:</label>
            {scheduledAppointments?.map((appointment) => {
                const appointmentDate = new Date(appointment.dateTime);
                const formattedDate = appointmentDate.toLocaleDateString('en-GB');
                const formattedTime = appointmentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                return (
                    <div key={appointment._id} className={`flex items-center gap-4 p-2 mb-2 rounded shadow ${darkTheme ? 'bg-gray-600' : 'bg-white'}`}>
                        <img src="/profilePicture/1737561841070-anmol_photo.jpg" alt="Doctor Profile" className="w-10 h-10 rounded-full object-cover" />

                        <div className="flex-grow">
                            <p className="text-lg font-semibold">{appointment.doctor.personal_info.fullName}</p>
                            <p className="text-sm text-gray-500">{appointment.doctor.professional_info.speciality}</p>
                        </div>

                        {new Date() >= new Date(appointment.dateTime) ? (
                            <button onClick={() => startCall(appointment._id)} className="bg-blue-500 text-white px-4 py-2 rounded">Start Call</button>
                        ) : (
                            <p className="text-gray-600">Scheduled on {formattedDate} at {formattedTime}.</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const BookAppointment = ({ darkTheme }) => {
    const [doctorId, setDoctorId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState("video");
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const [avilableDoctors, setAvilableDoctors] = useState([]);

    useEffect(() => {
        async function fetchAvailableDoctors() {
            try {
                const response = await axios.get(`${backendURL}/dashboard/appointments/available-doctors`, { withCredentials: true });
                setAvilableDoctors(response.data.doctors);
            } catch (error) {
                console.error('Error fetching available doctors:', error);
            }
        }
        fetchAvailableDoctors();
    }, []);

    // const avilableDoctors = [
    //     { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", experience: "10 years" },
    //     { id: 2, name: "Dr. Jane Smith", specialty: "Dermatologist", experience: "8 years" },
    //     { id: 3, name: "Dr. Emily Johnson", specialty: "Pediatrician", experience: "5 years" },
    // ]

    const bookAppointment = async () => {
        if (doctorId && date && time) {
            setError("");

            const dateTime = new Date(`${date}T${time}`).toISOString();
            // console.log({ doctorId, dateTime, type });

            await axios.post(`${backendURL}/dashboard/appointments/book`, { doctorId, dateTime, type, reason }, { withCredentials: true });

            alert("Appointment booked successfully!");
        }
        else {
            setError("Please fill in all the fields.");
        }
    };

    return (
        <>
            <div className={`flex flex-wrap justify-around items-center gap-4 rounded-lg p-4 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <div className="w-full">
                    <label className="block mb-2">Select Doctor:</label>
                    <div className="flex flex-wrap items-center gap-4">
                        {avilableDoctors?.map((doc) => (
                            <div
                                key={doc.id}
                                className={`w-full lg:w-auto flex items-center gap-4 p-4 rounded shadow cursor-pointer ${darkTheme ? 'bg-gray-600' : 'bg-white'} ${doctorId === doc.id ? 'border-2 border-blue-500' : ''}`}
                                onClick={() => setDoctorId(doc.id)}
                            >
                                <img src="/profilePicture/1737561841070-anmol_photo.jpg" alt="Doctor Profile" className="w-12 h-12 rounded-full object-cover" />
                                <div className="flex-grow">
                                    <p className="text-lg font-semibold">{doc.personal_info.fullName}</p>
                                    <p className={`text-sm ${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Speciality: {doc.professional_info.speciality}</p>
                                    <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Experience: {doc.professional_info.yearsOfExperience} years</p>
                                </div>
                                <input
                                    type="radio"
                                    name="doctor"
                                    checked={doctorId === doc.id}
                                    onChange={() => setDoctorId(doc.id)}
                                    className="w-5 h-5"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-50">
                    <label className="block">Select Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`w-full p-2 rounded ${darkTheme ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`} />
                </div>

                <div className="w-full md:w-50">
                    <label className="block">Select Time:</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={`w-full p-2 rounded ${darkTheme ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`} />
                </div>

                <div className="w-full md:w-50">
                    <label className="block">Consultation Type:</label>
                    <select
                        className={`w-full p-2 rounded ${darkTheme ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="video-call">Video Call</option>
                        <option value="chat">Chat</option>
                    </select>
                </div>

                <div className="w-full mb-4">
                    <label className="block">Reason for Appointment (Optional):</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter the reason for your appointment (disease, symptoms)..."
                        className={`w-full p-2 rounded ${darkTheme ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
                        rows="3"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm w-full text-center mb-4">{error}</p>
                )}

                <button onClick={bookAppointment} className="bg-blue-500 text-white w-50 px-4 py-2 rounded">Book</button>
            </div>
        </>
    );
};

export default DoctorConsultation;
