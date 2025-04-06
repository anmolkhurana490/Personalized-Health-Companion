import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AppContext } from '../../../AppProvider';

import 'react-tabs/style/react-tabs.css';
import '../../styles.css';

const ReportsandPrescriptions = () => {
    const { darkTheme } = useContext(AppContext);
    const [activeTab, setActiveTab] = React.useState('reports');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const options = ['reports', 'prescriptions'];

    return (
        <div
            className={`p-4 rounded shadow ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                }`}
        >
            <h2 className="text-xl font-bold mb-4">Reports & Prescriptions</h2>

            <Tabs
                selectedIndex={options.indexOf(activeTab)}
                onSelect={(index) => setActiveTab(options[index])}
            >
                <TabList className="flex w-full mb-4 font-semibold">
                    <Tab
                        className={`role-tab flex-grow text-center py-1 ${darkTheme
                                ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                            }`}
                    >
                        Reports
                    </Tab>
                    <Tab
                        className={`role-tab flex-grow text-center py-1 ${darkTheme
                                ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                            }`}
                    >
                        Prescriptions
                    </Tab>
                </TabList>

                <TabPanel>
                    <Reports darkTheme={darkTheme} />
                </TabPanel>
                <TabPanel>
                    <Prescriptions darkTheme={darkTheme} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

const Reports = ({ darkTheme }) => {
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by patient name, date, or type"
                    className={`border p-2 rounded w-full max-w-md ${darkTheme
                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                            : 'border-gray-300 bg-white text-gray-900'
                        }`}
                />
                <button
                    className={`mt-4 md:mt-0 md:ml-4 px-4 py-2 rounded ${darkTheme
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                >
                    Add Report
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                    className={`p-4 border rounded shadow ${darkTheme
                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                            : 'border-gray-300 bg-white text-gray-900'
                        }`}
                >
                    <h3 className="font-bold">Blood Test</h3>
                    <p>Patient: John Doe</p>
                    <p>Date: 2023-10-01</p>
                    <button
                        className={`mt-2 px-4 py-2 rounded ${darkTheme
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                    >
                        View
                    </button>
                </div>
            </div>
        </div>
    );
};

const Prescriptions = ({ darkTheme }) => {
    const [medicines, setMedicines] = React.useState([{ name: '', dosage: '', duration: '' }]);

    const handleMedicineChange = (index, field, value) => {
        const updatedMedicines = [...medicines];
        updatedMedicines[index][field] = value;
        setMedicines(updatedMedicines);
    };

    const addMedicine = () => {
        setMedicines([...medicines, { name: '', dosage: '', duration: '' }]);
    };

    return (
        <div
            className={`p-4 border rounded shadow ${darkTheme
                    ? 'border-gray-600 bg-gray-700 text-gray-100'
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
        >
            <h3 className="font-bold mb-2">Write Prescription</h3>

            {medicines.map((medicine, index) => (
                <div key={index} className="mt-4">
                    <h4 className="font-semibold mb-2">Medicine {index + 1}</h4>

                    <div className="flex flex-col md:flex-row gap-4 mb-4 border-b pb-4">
                        <div className="mb-2 flex-1">
                            <label className="block mb-1">Medicine Name</label>
                            <input
                                type="text"
                                className={`border p-2 rounded w-full ${darkTheme
                                        ? 'border-gray-600 bg-gray-700 text-gray-100'
                                        : 'border-gray-300 bg-white text-gray-900'
                                    }`}
                                value={medicine.name}
                                onChange={(e) =>
                                    handleMedicineChange(index, 'name', e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-2 flex-1">
                            <label className="block mb-1">Dosage</label>
                            <input
                                type="text"
                                className={`border p-2 rounded w-full ${darkTheme
                                        ? 'border-gray-600 bg-gray-700 text-gray-100'
                                        : 'border-gray-300 bg-white text-gray-900'
                                    }`}
                                value={medicine.dosage}
                                onChange={(e) =>
                                    handleMedicineChange(index, 'dosage', e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-2 flex-1">
                            <label className="block mb-1">Duration</label>
                            <input
                                type="text"
                                className={`border p-2 rounded w-full ${darkTheme
                                        ? 'border-gray-600 bg-gray-700 text-gray-100'
                                        : 'border-gray-300 bg-white text-gray-900'
                                    }`}
                                value={medicine.duration}
                                onChange={(e) =>
                                    handleMedicineChange(index, 'duration', e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button
                className={`px-4 py-2 rounded mt-4 ${darkTheme
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                onClick={addMedicine}
            >
                Add Medicine
            </button>

            <div className="mt-4">
                <label className="block mb-1">Special Instructions</label>
                <textarea
                    className={`border p-2 rounded w-full ${darkTheme
                            ? 'border-gray-600 bg-gray-700 text-gray-100'
                            : 'border-gray-300 bg-white text-gray-900'
                        }`}
                    rows="3"
                    placeholder="Enter any special instructions for the prescription"
                ></textarea>
            </div>

            <div className="mx-auto w-fit">
                <button
                    className={`px-8 py-2 rounded mt-4 ${darkTheme
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                >
                    Save Prescription
                </button>
            </div>
        </div>
    );
};

export default ReportsandPrescriptions;