import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AppContext } from '../../AppProvider';
import { loginSubmit } from './handlers';

import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import 'react-tabs/style/react-tabs.css';
import "../styles.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const roles = ['doctor', 'user']

    const { setLoggedIn, setProfile, setCurrRole } = useContext(AppContext);

    const { register, setError, formState: { errors, isSubmitting }, handleSubmit, setValue } = useForm()
    const [selectedRole, setSelectedRole] = useState('user')
    const [showPassword, setShowPassword] = useState(false)

    const handleTabSelect = async (index) => {
        const role = roles[index]
        setSelectedRole(role);
        setValue('role', role);
    }

    const navigate = useNavigate();

    return (
        <div className="w-2/5 space-y-16">
            <h1 className='text-4xl font-bold text-center'>Login To Your Account</h1>

            <div className="bg-gray-200 bg-opacity-70 text-lg p-6 rounded shadow-md w-full">
                <Tabs selectedIndex={roles.indexOf(selectedRole)} onSelect={handleTabSelect}>
                    <TabList className="flex w-full mb-4 font-semibold">
                        {/* <Tab className="role-tab flex-grow text-center py-1">Admin</Tab> */}
                        <Tab className="role-tab flex-grow text-center py-1">Doctor</Tab>
                        <Tab className="role-tab flex-grow text-center py-1">User</Tab>
                    </TabList>

                    {/* <TabPanel>
                        <h2 className='text-2xl font-bold text-center'>Admin Login</h2>
                    </TabPanel> */}
                    <TabPanel>
                        <h2 className='text-2xl font-bold text-center'>Doctor Login</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2 className='text-2xl font-bold text-center'>User Login</h2>
                    </TabPanel>
                </Tabs>

                <form onSubmit={handleSubmit((data) => loginSubmit(data, setProfile, setLoggedIn, setError, navigate, setCurrRole))} className='space-y-4'>
                    <input type="hidden" {...register("role", { required: true })} value={selectedRole} />

                    <div className="">
                        <label className="block text-gray-800">Email:</label>
                        <input
                            type="text"
                            {...register("email", {
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid Email Address"
                                },
                                required: "Email is Required"
                            })}
                            placeholder='Enter Your Registered Email'
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.email && <p className="text-red-500 text-base">{errors.email.message}</p>}
                    </div>

                    <div className="relative">
                        <label className="block text-gray-800">Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                minLength: { value: 4, message: "Password must be at least 4 characters" },
                                maxLength: { value: 9, message: "Password  cannot exceed 8 characters" },
                                required: "Password is Required"
                            })}
                            placeholder='Enter Your Password'
                            className="w-full px-3 py-2 border rounded"
                        />
                        <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-0 text-3xl px-4 py-2'>
                            {showPassword ? <IoEyeOff /> : <IoEye />}
                        </button>

                        {errors.password && <p className="text-red-500 text-base">{errors.password.message}</p>}
                    </div>

                    {errors.loginError && <p className="text-red-500 text-base">{errors.loginError.message}</p>}

                    <input type='submit' disabled={isSubmitting} className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400' />
                </form>
            </div>
        </div>
    );
};

export default Login;