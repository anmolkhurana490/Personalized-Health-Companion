import React from 'react';

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-200 bg-opacity-70 flex flex-col items-center">
            <header className="bg-blue-600 w-full py-4 text-white text-center">
                <h1 className="text-2xl font-bold">User Dashboard</h1>
            </header>
            <main className="flex-grow container mx-auto p-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Welcome, User!</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-blue-100 p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">Profile</h3>
                            <p className="mt-2">View and edit your profile information.</p>
                        </div>
                        <div className="bg-blue-100 p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">Health Stats</h3>
                            <p className="mt-2">Check your latest health statistics.</p>
                        </div>
                        <div className="bg-blue-100 p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">Settings</h3>
                            <p className="mt-2">Manage your account settings.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;