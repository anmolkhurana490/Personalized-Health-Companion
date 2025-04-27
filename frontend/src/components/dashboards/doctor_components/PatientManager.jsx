import React, { use, useContext, useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AppContext } from "../../../AppProvider";
import axios from "axios";

import { IoArrowBackOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const PatientManager = ({ profile }) => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState([]);

    const location = useLocation();
    const preselectedPatientId = location.state?.userId;

    useEffect(() => {
        const fetchPatients = async () => {
            const { data } = await axios.get(`${backendURL}/dashboard/appointments/consulted-patients`, { withCredentials: true });
            setPatients(data.consultedPatients);
        }
        fetchPatients();
    }, []);

    useEffect(() => {
        if (preselectedPatientId) {
            setSelectedPatient(patients?.find(patient => patient.user.id === preselectedPatientId));
        }
    }, [preselectedPatientId, patients]);

    return (
        selectedPatient ?
            <PatientProfile patient={selectedPatient} setSelectedPatient={setSelectedPatient} />
            : <PatientsList patients={patients} setSelectedPatient={setSelectedPatient} />
    )
}

const PatientsList = ({ patients, setSelectedPatient }) => {
    const { darkTheme } = useContext(AppContext);
    const [filteredPatients, setFilteredPatients] = useState([]);

    const [searchTerm, setSearchTerm] = React.useState("");


    useEffect(() => {
        setFilteredPatients(patients.filter((patient) =>
            patient.user.personal_info.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [searchTerm, patients]);

    return (
        <div
            className={`p-6 rounded-lg shadow-md ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"}`}
        >
            <h2 className="text-2xl font-semibold mb-6">Patient Manager</h2>
            <input
                type="text"
                placeholder="Search by name..."
                className={`border p-3 rounded-lg mb-6 w-full focus:outline-none focus:ring-2 ${darkTheme
                    ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-400"
                    : "border-gray-300 bg-white text-gray-900 focus:ring-blue-400"
                    }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
                    <thead className={`${darkTheme ? "bg-blue-600 text-gray-100" : "bg-blue-500 text-white"}`}>
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Age</th>
                            <th className="p-3 text-left">Gender</th>
                            <th className="p-3 text-left">Medical History</th>
                            <th className="p-3 text-left">Last Consultation</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients
                            .map((patient) => (
                                <tr
                                    key={patient.user.id}
                                    className={`border-b 
                                        ${darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                                        ${patient.user.health_info?.ai_generated.health_alert.emergency ? (darkTheme ? "bg-red-700" : "bg-red-100") : ""}
                                    `}
                                >
                                    <td className="p-3">{patient.user.personal_info.fullName}</td>
                                    <td className="p-3">{new Date().getFullYear() - new Date(patient.user.personal_info.dateOfBirth).getFullYear()}</td>
                                    <td className="p-3">{patient.user.personal_info.gender}</td>
                                    <td className="p-3">{patient.user.health_info?.medicalHistory.join(", ")}</td>
                                    <td className="p-3">{new Date(patient.dateTime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>

                                    <td className="p-3 space-x-4">
                                        <button
                                            className={`hover:underline ${darkTheme ? "text-blue-400" : "text-blue-500"
                                                }`}
                                            onClick={() => setSelectedPatient(patient)}
                                        >
                                            View Profile
                                        </button>
                                        <button
                                            className={`hover:underline ${darkTheme ? "text-green-400" : "text-green-500"
                                                }`}
                                        >
                                            Add Notes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PatientProfile = ({ patient, setSelectedPatient }) => {
    const { darkTheme } = useContext(AppContext);
    const [healthData, setHealthData] = useState({});

    useEffect(() => {
        setHealthData(patient.user.health_info);
    }, []);

    return (
        <div
            className={`p-6 rounded-lg shadow-md ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"}`}
        >
            <button
                onClick={() => setSelectedPatient(null)}
                className={`p-2 mb-2 rounded-full shadow ${darkTheme ? "bg-gray-600 text-gray-100 hover:bg-gray-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
                <IoArrowBackOutline />
            </button>

            <div className="flex flex-wrap gap-12 items-start not-md:items-center">
                <img
                    src={`/profilePicture/${patient.user.profilePicture || 'default-profile-picture.jpg'}`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-6"
                />
                <div>
                    <h2 className="text-2xl font-semibold mb-2">{patient.user.personal_info.fullName}</h2>
                    <p className="mb-1"><strong>Email:</strong> {patient.user.personal_info.email}</p>
                    <p className="mb-1"><strong>Phone:</strong> {patient.user.personal_info.phoneNumber}</p>
                    <p className="mb-1"><strong>Gender:</strong> {patient.user.personal_info.gender}</p>
                    <p className="mb-1"><strong>Age:</strong> {new Date().getFullYear() - new Date(patient.user.personal_info.dateOfBirth).getFullYear()}</p>
                </div>

                <div className="">
                    <h3 className="text-xl font-semibold mb-3">Medical Details</h3>
                    <p className="mb-1"><strong>Height:</strong> {healthData?.height} cm</p>
                    <p className="mb-1"><strong>Weight:</strong> {healthData?.weight} kg</p>
                    <p className="mb-1"><strong>Blood Group:</strong> {healthData?.bloodGroup}</p>
                    <p className="mb-1"><strong>Known Allergies:</strong> {healthData?.knownAllergies || "None"}</p>
                    <p className="mb-1"><strong>Existing Medical Conditions:</strong> {healthData?.existingMedicalConditions || "None"}</p>
                    <p className="mb-1"><strong>Medical History:</strong> {healthData?.medicalHistory?.map((history) => `${history.condition} (${history.status})`).join(", ") || "None"}</p>
                </div>

                <div className="">
                    <h3 className="text-xl font-semibold mb-3">Emergency Contact</h3>
                    <p className="mb-1"><strong>Name:</strong> {patient.user.emergency_contact.emergencyContactName}</p>
                    <p className="mb-1"><strong>Relationship:</strong> {patient.user.emergency_contact.emergencyContactRelationship}</p>
                    <p className="mb-1"><strong>Phone:</strong> {patient.user.emergency_contact.emergencyContactPhone}</p>
                </div>

                <div className="w-full space-y-4">
                    <h3 className="text-xl font-semibold mb-3">Health Records</h3>

                    <div className="flex flex-wrap gap-6">
                        <div>
                            <h3 className={`text-lg font-semibold mb-2 ${darkTheme ? "text-gray-100" : "text-gray-900"}`}>Summary</h3>
                            <p className={`text-gray-600 ${darkTheme ? "text-gray-300" : "text-gray-700"}`}>{healthData?.ai_generated?.health_summary}</p>
                        </div>

                        <div>
                            <h3 className={`text-lg font-semibold mb-2 ${darkTheme ? "text-gray-100" : "text-gray-900"}`}>Alerts</h3>
                            <p className={`text-gray-600 ${darkTheme ? "text-gray-300" : "text-gray-700"}`}>{healthData?.ai_generated?.health_alert.alert}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 justify-around">
                        {healthData?.weightHistory && healthData.weightHistory.length > 0 && (
                            <div className={`p-4 w-[100%] md:w-[70%] lg:w-[40%] rounded ${darkTheme ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
                                <h3 className="text-xl font-semibold mb-2">📊 Weight Progress</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={healthData.weightHistory}>
                                        <XAxis dataKey="month" />
                                        <YAxis dataKey="weight" />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        {healthData?.heartRateHistory && healthData.heartRateHistory.length > 0 && (
                            <div className={`p-4 rounded ${darkTheme ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
                                <h3 className="text-xl font-semibold mb-2">📊 Heart Rate History</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={healthData.heartRateHistory}>
                                        <XAxis dataKey="month" />
                                        <YAxis dataKey="heart rate" />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="heart rate" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PatientManager;