import React, { useEffect, useState, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { IoArrowBackOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../../AppProvider';

import 'react-tabs/style/react-tabs.css';
import '../../styles.css';

const DoctorConsultation = () => {
    const location = useLocation();
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

                <TabPanel><ChatWithDoctor darkTheme={darkTheme} /></TabPanel>
                <TabPanel><VideoCallDoctor darkTheme={darkTheme} /></TabPanel>
                <TabPanel><BookAppointment darkTheme={darkTheme} /></TabPanel>
            </Tabs>
        </div>
    );
};

const ChatWithDoctor = ({ darkTheme }) => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const assignedDoctors = [
        { id: 1, name: "Dr. John Doe" },
        { id: 2, name: "Dr. Jane Smith" },
    ];

    const onBack = () => setSelectedDoctor(null);

    return (
        <div className={`h-[50vh] rounded-lg p-4 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {selectedDoctor ? (
                <Chat selectedDoctor={selectedDoctor} onBack={onBack} darkTheme={darkTheme} />
            ) : (
                <>
                    <p className=''>Please select a doctor to start chatting.</p>
                    {assignedDoctors.map((doc) => (
                        <div key={doc.id} className={`flex items-center gap-4 p-2 mb-2 rounded shadow ${darkTheme ? 'bg-gray-600' : 'bg-white'}`}>
                            <img src="/profilePicture/1737561841070-anmol_photo.jpg" alt="Doctor Profile" className="w-10 h-10 rounded-full object-cover" />
                            <div className="flex-grow">
                                <p className="text-lg font-semibold">{doc.name}</p>
                                <p className={`text-sm ${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>General Practitioner</p>
                            </div>
                            <button onClick={() => setSelectedDoctor(doc)} className="bg-blue-500 text-white px-4 py-2 rounded">Chat</button>
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

    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (input.trim()) {
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
                    <img src="/profilePicture/1737561841070-anmol_photo.jpg" alt="Doctor Profile" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-grow">
                        <p className="text-lg font-semibold">{selectedDoctor.name}</p>
                        <p className="text-sm text-gray-500">General Practitioner</p>
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
    const scheduledAppointments = [
        { id: 1, doctor: { name: "Dr. John Doe" }, dateTime: "2025-02-25T10:00:00" },
        { id: 2, doctor: { name: "Dr. Jane Smith" }, dateTime: "2025-02-22T16:41:00" },
    ];

    const startCall = (id) => {
        window.open(`/user/video-call/${id}`, '_blank');
    };

    return (
        <div className={`h-[50vh] overflow-y-auto custom-scrollbar rounded-lg p-4 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <label className="block mb-2">Select Appointment:</label>
            {scheduledAppointments.map((appointment) => {
                const appointmentDate = new Date(appointment.dateTime);
                const formattedDate = appointmentDate.toLocaleDateString('en-GB');
                const formattedTime = appointmentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                return (
                    <div key={appointment.id} className={`flex items-center gap-4 p-2 mb-2 rounded shadow ${darkTheme ? 'bg-gray-600' : 'bg-white'}`}>
                        <img src="/profilePicture/1737561841070-anmol_photo.jpg" alt="Doctor Profile" className="w-10 h-10 rounded-full object-cover" />

                        <div className="flex-grow">
                            <p className="text-lg font-semibold">{appointment.doctor.name}</p>
                            <p className="text-sm text-gray-500">General Practitioner</p>
                        </div>

                        {new Date() >= new Date(appointment.dateTime) ? (
                            <button onClick={() => startCall(appointment.id)} className="bg-blue-500 text-white px-4 py-2 rounded">Start Call</button>
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
    const [doctor, setDoctor] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const bookAppointment = () => {
        console.log({ doctor, date, time });
        alert("Appointment booked successfully!");
    };

    return (
        <div className={`max-h-[50vh] flex flex-wrap justify-between items-center rounded-lg p-4 ${darkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <div className="w-full md:w-2/5 mb-4 md:mb-0">
                <label className="block">Select Doctor:</label>
                <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className={`w-full p-2 rounded ${darkTheme ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}>
                    <option value="">-- Select --</option>
                    <option value="Dr. John Doe">Dr. John Doe</option>
                    <option value="Dr. Jane Smith">Dr. Jane Smith</option>
                </select>
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
                <label className="block">Select Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`w-full p-2 rounded ${darkTheme ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`} />
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
                <label className="block">Select Time:</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={`w-full p-2 rounded ${darkTheme ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`} />
            </div>
            <button onClick={bookAppointment} className="bg-blue-500 text-white px-4 py-2 rounded">Book</button>
        </div>
    );
};

export default DoctorConsultation;
