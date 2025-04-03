import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import '../../styles.css'

const ReportsandPrescriptions = () => {
    const [activeTab, setActiveTab] = React.useState('reports');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const options = ['reports', 'prescriptions']

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Reports & Prescriptions</h2>

            <Tabs selectedIndex={options.indexOf(activeTab)} onSelect={(index) => setActiveTab(options[index])}>
                <TabList className="flex w-full mb-4 font-semibold">
                    <Tab className="role-tab flex-grow text-center py-1">Reports</Tab>
                    <Tab className="role-tab flex-grow text-center py-1">Prescriptions</Tab>
                </TabList>

                <TabPanel><Reports /></TabPanel>
                <TabPanel><Prescriptions /></TabPanel>
            </Tabs>
        </div>
    );
};

const Reports = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by patient name, date, or type"
                    className="border p-2 rounded w-full max-w-md"
                />
                <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Add Report
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Example Report Card */}
                <div className="p-4 border rounded shadow">
                    <h3 className="font-bold">Blood Test</h3>
                    <p>Patient: John Doe</p>
                    <p>Date: 2023-10-01</p>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                        View
                    </button>
                </div>
            </div>
        </div>
    )
}

const Prescriptions = () => {
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
        <div className="p-4 border rounded shadow">
            <h3 className="font-bold mb-2">Write Prescription</h3>

            {medicines.map((medicine, index) => (
                <div className='mt-4'>
                    <h4 className="font-semibold mb-2">Medicine {index + 1}</h4>

                    <div key={index} className="flex gap-4 mb-4 border-b pb-4">
                        <div className="mb-2">
                            <label className="block mb-1">Medicine Name</label>
                            <input
                                type="text"
                                className="border p-2 rounded w-full inline"
                                value={medicine.name}
                                onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block mb-1">Dosage</label>
                            <input
                                type="text"
                                className="border p-2 rounded w-full"
                                value={medicine.dosage}
                                onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block mb-1">Duration</label>
                            <input
                                type="text"
                                className="border p-2 rounded w-full"
                                value={medicine.duration}
                                onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                onClick={addMedicine}
            >
                Add Medicine
            </button>

            <div className="mt-4">
                <label className="block mb-1">Special Instructions</label>
                <textarea
                    className="border p-2 rounded w-full"
                    rows="3"
                    placeholder="Enter any special instructions for the prescription"
                ></textarea>
            </div>

            <div className='mx-auto w-fit'>
                <button className="bg-blue-500 text-white px-8 py-2 rounded mt-4">
                    Save Prescription
                </button>
            </div>
        </div>
    );
}

export default ReportsandPrescriptions;