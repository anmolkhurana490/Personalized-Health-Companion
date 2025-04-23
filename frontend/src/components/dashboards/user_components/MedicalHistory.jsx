import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../../../AppProvider";
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const MedicalHistory = () => {
    const { darkTheme, profile } = useContext(AppContext);
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

    return (
        <div className={`max-h-full overflow-auto custom-scrollbar p-4 rounded shadow ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
            <h2 className="text-2xl font-semibold mb-2">🩺 Medical History</h2>
            <p className="mb-4">Upload and view your medical reports or prescriptions here.</p>

            {/* div for Different Sections */}
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-4 gap-y-8 p-4">
                {/* 🔹 Doctors Consulted & Prescriptions */}
                <div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">🩺 Doctors Consulted</h3>
                        <ul className="space-y-3">
                            {consultedDoctors.map((doctor) => (
                                <li key={doctor.doctor.id}>
                                    👨‍⚕️ {doctor.doctor.personal_info.fullName} ({doctor.doctor.professional_info.speciality}) -
                                    <button className={`underline ${darkTheme ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"}`}>
                                        View Prescription
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 🔹 Medical Conditions */}
                <div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">📋 Medical Conditions</h3>
                        <ul className="space-y-2">
                            <li>✅ Hypertension (Ongoing)</li>
                            <li>✅ Diabetes (Diagnosed 2020)</li>
                            <li>❌ Chickenpox (Recovered in 2015)</li>
                        </ul>
                    </div>
                </div>

                {/* 🔹 Ongoing Medications */}
                <div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">💊 Medications</h3>
                        <ul className="space-y-2">
                            <li>🕒 Metformin - 500mg (Twice a day)</li>
                            <li>🕒 Losartan - 50mg (Once a day)</li>
                        </ul>
                    </div>
                </div>

                {/* 🔹 Test Reports */}
                <div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">📄 Test Reports</h3>
                        <ul className="space-y-3">
                            <li>🩸 Blood Test - <button className={`underline ${darkTheme ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"}`}>Download Report</button></li>
                            <li>🩺 ECG - <button className={`underline ${darkTheme ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"}`}>View Report</button></li>
                        </ul>
                    </div>
                </div>

                {/* 🔹 Health Logs */}
                <div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">📊 Health Logs</h3>
                        <ul className="space-y-2">
                            <li>🩸 Blood Pressure: 120/80 mmHg</li>
                            <li>💓 Heart Rate: 72 BPM</li>
                            <li>🔄 Sugar Level: 110 mg/dL</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalHistory;
