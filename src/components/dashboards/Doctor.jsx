import React from 'react';

const DoctorDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-200 bg-opacity-70 p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Patient List</h2>
                        <p className="text-gray-600">View and manage your patients.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Appointments</h2>
                        <p className="text-gray-600">Check your upcoming appointments.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Messages</h2>
                        <p className="text-gray-600">View messages from patients.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Prescriptions</h2>
                        <p className="text-gray-600">Manage patient prescriptions.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Reports</h2>
                        <p className="text-gray-600">Access patient reports and diagnostics.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Settings</h2>
                        <p className="text-gray-600">Adjust your account settings.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;