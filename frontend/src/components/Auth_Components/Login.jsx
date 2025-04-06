import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AppContext } from '../../AppProvider';
import { loginSubmit } from './handlers';

import { IoEye, IoEyeOff } from "react-icons/io5";
import 'react-tabs/style/react-tabs.css';
import "../styles.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const roles = ['doctor', 'user'];
    const { setLoggedIn, setProfile, setCurrRole, darkTheme } = useContext(AppContext);

    const { register, setError, formState: { errors, isSubmitting }, handleSubmit, setValue } = useForm();
    const [selectedRole, setSelectedRole] = useState('user');
    const [showPassword, setShowPassword] = useState(false);

    const handleTabSelect = async (index) => {
        const role = roles[index];
        setSelectedRole(role);
        setValue('role', role);
    };

    const navigate = useNavigate();

    return (
        <div className={`w-full sm:max-w-3/4 md:max-w-1/2 lg:max-w-2/5 xl:max-w-1/3 mx-auto space-y-8 py-4 px-2 md:p-6 rounded ${darkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
            <h1 className="text-3xl md:text-4xl font-bold text-center my-6">Login To Your Account</h1>

            <div className={`p-4 rounded shadow ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
                <Tabs selectedIndex={roles.indexOf(selectedRole)} onSelect={handleTabSelect}>
                    <TabList className="flex w-full mb-4 font-semibold">
                        <Tab className={`role-tab flex-grow text-center py-2 ${darkTheme ? 'text-gray-100' : 'text-gray-800'}`}>Doctor</Tab>
                        <Tab className={`role-tab flex-grow text-center py-2 ${darkTheme ? 'text-gray-100' : 'text-gray-800'}`}>User</Tab>
                    </TabList>

                    <TabPanel>
                        <h2 className="text-xl font-bold text-center">Doctor Login</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2 className="text-xl font-bold text-center">User Login</h2>
                    </TabPanel>
                </Tabs>

                <form onSubmit={handleSubmit((data) => loginSubmit(data, setProfile, setLoggedIn, setError, navigate, setCurrRole))} className="space-y-4">
                    <input type="hidden" {...register("role", { required: true })} value={selectedRole} />

                    <div>
                        <label className="block mb-1">Email:</label>
                        <input
                            type="text"
                            {...register("email", {
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid Email Address"
                                },
                                required: "Email is Required"
                            })}
                            placeholder="Enter Your Registered Email"
                            className={`w-full px-3 py-2 border rounded ${darkTheme ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="relative">
                        <label className="block mb-1">Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                minLength: { value: 4, message: "Password must be at least 4 characters" },
                                maxLength: { value: 9, message: "Password cannot exceed 8 characters" },
                                required: "Password is Required"
                            })}
                            placeholder="Enter Your Password"
                            className={`w-full px-3 py-2 border rounded ${darkTheme ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10 text-xl">
                            {showPassword ? <IoEyeOff /> : <IoEye />}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {errors.loginError && <p className="text-red-500 text-sm">{errors.loginError.message}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 rounded font-semibold transition-colors ${darkTheme ? 'bg-blue-600 hover:bg-blue-700 text-gray-100 disabled:bg-blue-400' : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300'}`}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
