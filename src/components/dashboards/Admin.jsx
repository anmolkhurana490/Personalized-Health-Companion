import React from 'react';

const Admin = () => {
    return (
        <div className="min-h-screen bg-gray-200 bg-opacity-70 flex flex-col">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl">Admin Dashboard</h1>
            </header>
            <div className="flex flex-1">
                <aside className="w-64 bg-gray-800 text-white p-4">
                    <nav>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:underline">Dashboard</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Users</a></li>
                            <li className="mb-2"><a href="#" className="hover:underline">Settings</a></li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-4">
                    <h2 className="text-xl mb-4">Welcome, Admin!</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg">Statistics</h3>
                            <p>Some statistics here...</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg">Recent Activities</h3>
                            <p>Some recent activities here...</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg">User Management</h3>
                            <p>Some user management info here...</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Admin;