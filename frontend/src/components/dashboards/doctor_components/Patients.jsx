import React, { useContext } from "react";
import { AppContext } from "../../../AppProvider";

const Patients = ({ profile }) => {
    const { darkTheme } = useContext(AppContext);
    const [patients, setPatients] = React.useState([
        {
            id: 1,
            name: "John Doe",
            age: 45,
            gender: "Male",
            medicalHistory: "Diabetes, Hypertension",
            lastConsultation: "2023-10-01",
            emergency: false,
        },
        {
            id: 2,
            name: "Jane Smith",
            age: 32,
            gender: "Female",
            medicalHistory: "Asthma",
            lastConsultation: "2023-09-25",
            emergency: true,
        },
        {
            id: 3,
            name: "Alice Johnson",
            age: 29,
            gender: "Female",
            medicalHistory: "None",
            lastConsultation: "2023-09-15",
            emergency: false,
        },
        {
            id: 4,
            name: "Robert Brown",
            age: 50,
            gender: "Male",
            medicalHistory: "Heart Disease",
            lastConsultation: "2023-09-20",
            emergency: true,
        },
        {
            id: 5,
            name: "Emily Davis",
            age: 40,
            gender: "Female",
            medicalHistory: "Arthritis",
            lastConsultation: "2023-09-30",
            emergency: false,
        },
        {
            id: 6,
            name: "Michael Wilson",
            age: 37,
            gender: "Male",
            medicalHistory: "High Cholesterol",
            lastConsultation: "2023-09-28",
            emergency: false,
        },
        {
            id: 7,
            name: "Sophia Martinez",
            age: 25,
            gender: "Female",
            medicalHistory: "Anemia",
            lastConsultation: "2023-09-18",
            emergency: false,
        },
        {
            id: 8,
            name: "James Anderson",
            age: 60,
            gender: "Male",
            medicalHistory: "Parkinson's Disease",
            lastConsultation: "2023-09-10",
            emergency: true,
        },
        {
            id: 9,
            name: "Olivia Thomas",
            age: 34,
            gender: "Female",
            medicalHistory: "Thyroid Issues",
            lastConsultation: "2023-09-22",
            emergency: false,
        },
        {
            id: 10,
            name: "William Garcia",
            age: 48,
            gender: "Male",
            medicalHistory: "Kidney Stones",
            lastConsultation: "2023-09-12",
            emergency: false,
        },
    ]);

    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            .sort((a, b) => new Date(b.lastConsultation) - new Date(a.lastConsultation))
                            .map((patient) => (
                                <tr
                                    key={patient.id}
                                    className={`border-b ${patient.emergency
                                            ? darkTheme
                                                ? "bg-red-900"
                                                : "bg-red-100"
                                            : darkTheme
                                                ? "hover:bg-gray-700"
                                                : "hover:bg-gray-100"
                                        }`}
                                >
                                    <td className="p-3">{patient.name}</td>
                                    <td className="p-3">{patient.age}</td>
                                    <td className="p-3">{patient.gender}</td>
                                    <td className="p-3">{patient.medicalHistory}</td>
                                    <td className="p-3">{patient.lastConsultation}</td>
                                    <td className="p-3 space-x-2">
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