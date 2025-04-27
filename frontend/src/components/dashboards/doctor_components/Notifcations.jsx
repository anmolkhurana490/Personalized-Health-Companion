import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppProvider";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Notifications = () => {
    const { darkTheme } = useContext(AppContext);
    const [emergencyPatients, setEmergencyPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const { data } = await axios.get(`${backendURL}/dashboard/appointments/consulted-patients`, { withCredentials: true });
            setEmergencyPatients(data.consultedPatients.filter(patient => patient.user.health_info.ai_generated.health_alert.emergency === true));
        }
        fetchPatients();
    }, []);

    return (
        <div className="p-4">
            <div className={`p-4 rounded shadow ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
                <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
                <p>View your notifications here.</p>
            </div>

            {emergencyPatients.length > 0 ? (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">Emergency Patients</h3>
                    <ul className="space-y-4">
                        {emergencyPatients.map((patient, index) => (
                            <li
                                key={index}
                                className={`p-4 rounded shadow ${darkTheme ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800'}`}
                            >
                                <h3 className="text-lg font-semibold">{patient.user.personal_info.fullName}</h3>
                                <p className="text-sm">Condition: {patient.user.health_info.existingMedicalConditions || 'None'}</p>
                                <p className="text-sm">Contact: {patient.user.personal_info.phoneNumber}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-4">No emergency patients at the moment.</p>
            )}
        </div>
    );
};

export default Notifications;