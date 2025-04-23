import React, { use, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppProvider";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Patients = ({ profile }) => {
    const { darkTheme } = useContext(AppContext);
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const { data } = await axios.get(`${backendURL}/dashboard/appointments/consulted-patients`, { withCredentials: true });
            setPatients(data.consultedPatients);
        }
        fetchPatients();
    }, []);

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
                                    className={`border-b ${darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                                >
                                    <td className="p-3">{patient.user.personal_info.fullName}</td>
                                    <td className="p-3">{new Date().getFullYear() - new Date(patient.user.personal_info.dateOfBirth).getFullYear()}</td>
                                    <td className="p-3">{patient.user.personal_info.gender}</td>
                                    <td className="p-3">{patient.user.health_info.medicalHistory.join(", ")}</td>
                                    <td className="p-3">{new Date(patient.dateTime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>

                                    <td className="p-3 space-x-4">
                                        <button
                                            className={`hover:underline ${darkTheme ? "text-blue-400" : "text-blue-500"
                                                }`}
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

export default Patients;