import React from 'react';
import { MdAdminPanelSettings } from "react-icons/md";

const Admin = () => {
    return (
        <>
            <h1 className="text-2xl font-semibold mx-6 mb-6">
                Admin Dashboard <MdAdminPanelSettings className='inline text-3xl' />
            </h1>
            <div className="flex min-h-screen">
                <aside className="w-64 bg-gray-800 text-white p-4">
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Platform Statistics</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Recent Activities</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">User Management</a>
                            </li >
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Doctor Management</a>
                            </li >
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Admin Management</a>
                            </li >
                            <li className="mb-4">
                                <a href="#" className="hover:text-gray-400">Notifications/Logs</a>
                            </li >
                        </ul >
                    </nav >
                </aside >
                <div className="flex-1 p-4 bg-gray-200 bg-opacity-70 rounded-lg">
                    <main>
                        <h2 className="text-xl mb-4">Welcome, Admin!</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded shadow">
                                <h3 className="text-lg">Platform Statistics</h3>
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
                            <div className="bg-white p-4 rounded shadow">
                                <h3 className="text-lg">Doctor Management</h3>
                                <p>Some user management info here...</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <h3 className="text-lg">Admin Management</h3>
                                <p>Some user management info here...</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <h3 className="text-lg">Notifications/Logs</h3>
                                <p>Some user management info here...</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Admin;