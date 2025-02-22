import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import '../../styles.css'
import { IoArrowBackOutline } from "react-icons/io5";

const DoctorConsultation = () => {
    const [activeTab, setActiveTab] = useState("doctor-chat");

    const options = ["doctor-chat", "video-call", "book-appointment"]

    return (

        <div className="max-h-full overflow-auto custom-scrollbar bg-white rounded shadow p-4">
            <div className='mb-8'>
                <h2 className="text-2xl font-semibold mb-2">Doctor Consultation</h2>
                <p>Chat, Video Call, Book Appointment</p>
            </div>

            <Tabs selectedIndex={options.indexOf(activeTab)} onSelect={(index) => setActiveTab(options[index])}>
                <TabList className="flex w-full mb-4 font-semibold">
                    <Tab className="role-tab flex-grow text-center py-1">Chat with Doctor</Tab>
                    <Tab className="role-tab flex-grow text-center py-1">Video Call</Tab>
                    <Tab className="role-tab flex-grow text-center py-1">Book New Appointment</Tab>
                </TabList>

                <TabPanel><ChatWithDoctor /></TabPanel>
                <TabPanel><VideoCallDoctor /></TabPanel>
                <TabPanel><BookAppointment /></TabPanel>
            </Tabs>
        </div>

    )
}

const ChatWithDoctor = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const assignedDoctors = [
        { id: 1, name: "Dr. John Doe" },
        { id: 2, name: "Dr. Jane Smith" },
    ];

    useEffect(() => {
        // socket.on("message", (message) => {
        //     setMessages((prev) => [...prev, message]);
        // });

        // return () => {
        //     socket.off("message");
        // };
    }, []);

    const onBack = () => setSelectedDoctor(null);

    return (
        <div className="h-[50vh] rounded-lg p-4 bg-gray-100">
            {selectedDoctor ? (
                <Chat selectedDoctor={selectedDoctor} onBack={onBack} />
            ) : (
                <>
                    <p className="text-gray-800">Please select a doctor to start chatting.</p>
                    {assignedDoctors.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-4 p-2 mb-2 bg-white rounded shadow">
                            <img src="/profilePicture/1737561841070-anmol_photo.jpg" alt="Doctor Profile" className="w-10 h-10 rounded-full object-cover" />
                            <div className="flex-grow">
                                <p className="text-lg font-semibold">{doc.name}</p>
                                <p className="text-sm text-gray-500">General Practitioner</p>
                            </div>
                            <button onClick={() => setSelectedDoctor(doc)} className="bg-blue-500 text-white px-4 py-2 rounded">Chat</button>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

const Chat = ({ selectedDoctor, onBack }) => {
    const [messages, setMessages] = useState([
        { sender: "doctor", text: "Hello, how can I assist you today?" },
        { sender: "user", text: "I have been experiencing headaches lately." },
        { sender: "doctor", text: "I'm sorry to hear that. How long have you been having these headaches?" },
        { sender: "user", text: "For about a week now." },
        { sender: "doctor", text: "Have you taken any medication for it?" },
        { sender: "user", text: "Yes, but it doesn't seem to help much." },
    ]);

    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (input.trim()) {
            //   socket.emit("message", { sender: "user", text: input });
            setMessages((prev) => [...prev, { sender: "user", text: input }]);
            setInput("");
        }
    };

    return (
        <>
            <div className="flex gap-8 items-center mb-4 px-4 py-2 bg-white border rounded shadow">
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

            <div className="h-[30vh] overflow-y-auto custom-scrollbar bg-white p-2 border rounded">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                        <span className={`inline-block px-3 py-1 rounded-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
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
                    className="w-full p-2 border rounded-l"
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">Send</button>
            </div>
        </>
    )
}

const VideoCallDoctor = () => {
    const scheduledAppointments = [
        { id: 1, doctor: { name: "Dr. John Doe" }, dateTime: "2025-02-25T10:00:00" },
        { id: 2, doctor: { name: "Dr. Jane Smith" }, dateTime: "2025-02-22T16:41:00" },
    ];

    const startCall = (id) => {
        window.open(`/user/video-call/${id}`, '_blank');
    };

    return (
        <div className="h-[50vh] overflow-y-auto custom-scrollbar border rounded-lg p-4 bg-gray-100">
            <label className="block mb-2">Select Appointment:</label>
            {scheduledAppointments.map((appointment) => {
                const appointmentDate = new Date(appointment.dateTime);
                const formattedDate = appointmentDate.toLocaleDateString('en-GB');
                const formattedTime = appointmentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                return (
                    <div key={appointment.id} className="flex items-center gap-4 p-2 mb-2 bg-white rounded shadow">
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
    )
}

const BookAppointment = () => {
    const [doctor, setDoctor] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const bookAppointment = () => {
        console.log({ doctor, date, time });
        alert("Appointment booked successfully!");
    };

    return (
        <div className="max-h-[50vh] border rounded-lg p-4 bg-gray-100">
            <div className="mb-2">
                <label className="block">Select Doctor:</label>
                <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="w-full p-2 border rounded">
                    <option value="">-- Select --</option>
                    <option value="Dr. John Doe">Dr. John Doe</option>
                    <option value="Dr. Jane Smith">Dr. Jane Smith</option>
                </select>
            </div>
            <div className="mb-2">
                <label className="block">Select Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-2">
                <label className="block">Select Time:</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <button onClick={bookAppointment} className="bg-blue-500 text-white px-4 py-2 rounded">Book</button>
        </div>
    )
}

export default DoctorConsultation
