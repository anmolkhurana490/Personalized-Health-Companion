import React from 'react'
// import { FileText, Stethoscope, Clipboard, Pills, File, Heart } from "lucide-react";

const MedicalHistory = () => {
    return (
        <div className="max-h-full overflow-auto custom-scrollbar p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">🩺 Medical History</h2>
            <p>Upload and view your medical reports or prescriptions here.</p>

            {/* div for Different Sections */}
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 p-4">
                {/* 🔹 Doctors Consulted & Prescriptions */}
                <div>
                    <div>
                        <div><h3 className="text-lg font-semibold">🩺 Doctors Consulted</h3></div>
                        <div>
                            <ul className="space-y-3">
                                <li>👨‍⚕️ Dr. Amit Sharma (Cardiologist) - <button variant="link">View Prescription</button></li>
                                <li>👩‍⚕️ Dr. Priya Verma (Dermatologist) - <button variant="link">View Prescription</button></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 🔹 Medical Conditions (Past & Present Diseases) */}
                <div>
                    <div>
                        <div><h3 className="text-lg font-semibold">📋 Medical Conditions</h3></div>
                        <div>
                            <ul>
                                <li>✅ Hypertension (Ongoing)</li>
                                <li>✅ Diabetes (Diagnosed 2020)</li>
                                <li>❌ Chickenpox (Recovered in 2015)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 🔹 Ongoing Medications */}
                <div>
                    <div>
                        <div><h3 className="text-lg font-semibold">💊 Medications</h3></div>
                        <div>
                            <ul>
                                <li>🕒 Metformin - 500mg (Twice a day)</li>
                                <li>🕒 Losartan - 50mg (Once a day)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 🔹 Test Reports */}
                <div>
                    <div>
                        <div><h3 className="text-lg font-semibold">📄 Test Reports</h3></div>
                        <div>
                            <ul>
                                <li>🩸 Blood Test - <button variant="link">Download Report</button></li>
                                <li>🩺 ECG - <button variant="link">View Report</button></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 🔹 Health Logs */}
                <div>
                    <div>
                        <div><h3 className="text-lg font-semibold">📊 Health Logs</h3></div>
                        <div>
                            <ul>
                                <li>🩸 Blood Pressure: 120/80 mmHg</li>
                                <li>💓 Heart Rate: 72 BPM</li>
                                <li>🔄 Sugar Level: 110 mg/dL</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalHistory;