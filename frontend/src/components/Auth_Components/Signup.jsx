import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import form_data from "./formComponent_data";
import { IoEye, IoEyeOff } from "react-icons/io5";
import 'react-tabs/style/react-tabs.css';
import "../styles.css";
import { signupSubmit } from './handlers';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppProvider';

const Signup = () => {
    const roles = ['doctor', 'user'];
    const [selectedRole, setSelectedRole] = useState("user");
    const { darkTheme } = useContext(AppContext);

    const handleTabSelect = (index) => {
        const role = roles[index];
        setSelectedRole(role);
    };

    const navigate = useNavigate();

    return (
        <div className={`w-full lg:max-w-5/6 mx-auto space-y-16 py-4 px-2 md:p-6 rounded ${darkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
            <h1 className="text-3xl md:text-4xl font-bold text-center my-6">Register Your New Account</h1>

            <div className={`p-6 rounded shadow ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
                <Tabs selectedIndex={roles.indexOf(selectedRole)} onSelect={handleTabSelect}>
                    <TabList className="flex w-full mb-4 font-semibold">
                        <Tab className={`role-tab flex-grow text-center py-2 ${darkTheme ? 'text-gray-100' : 'text-gray-800'}`}>Doctor</Tab>
                        <Tab className={`role-tab flex-grow text-center py-2 ${darkTheme ? 'text-gray-100' : 'text-gray-800'}`}>User</Tab>
                    </TabList>

                    <TabPanel>
                        <h2 className="text-2xl font-bold text-center">Doctor Register</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2 className="text-2xl font-bold text-center">User Register</h2>
                    </TabPanel>
                </Tabs>

                {
                    selectedRole === "doctor" ? <DoctorComponent onSubmit={(data) => signupSubmit(data, navigate)} darkTheme={darkTheme} /> :
                        <UserComponent onSubmit={(data) => signupSubmit(data, navigate)} darkTheme={darkTheme} />
                }
            </div>
        </div>
    );
};

const DoctorComponent = ({ onSubmit, darkTheme }) => {
    const { register, formState: { errors, isSubmitting }, handleSubmit, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-8">
            <input type="hidden" {...register("role", { required: true })} value={"doctor"} />

            {
                Object.entries(form_data["doctor"]).map(([compKey, compData], index) => (
                    <div key={index} className="my-8">
                        <h3 className="text-xl font-semibold my-2">{compData.title}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6">
                            {Object.entries(compData.inputs).map(([inputName, inputData], idx) => (
                                <div key={idx} className="mb-4 relative">
                                    <label className="block mb-1">{inputData.label}:</label>
                                    {
                                        inputData.type === "select" ?
                                            <SelectComp {...{ compKey, inputName, inputData, register, darkTheme }} /> :
                                            inputData.type === "password" ?
                                                <PasswordComp {...{ compKey, inputName, inputData, register, watch, showPassword, setShowPassword, darkTheme }} /> :
                                                <InputComp {...{ compKey, inputName, inputData, register, darkTheme }} />
                                    }
                                    {errors[compKey] && errors[compKey][inputName] && <p className="text-red-500 text-sm">
                                        {errors[compKey][inputName].message}
                                    </p>}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded font-semibold transition-colors ${darkTheme ? 'bg-blue-600 hover:bg-blue-700 text-gray-100 disabled:bg-blue-400' : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300'}`}
            >
                {isSubmitting ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

const UserComponent = ({ onSubmit, darkTheme }) => {
    const { register, formState: { errors, isSubmitting }, handleSubmit, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-8">
            <input type="hidden" {...register("role", { required: true })} value={"user"} />

            {
                Object.entries(form_data["user"]).map(([compKey, compData], index) => (
                    <div key={index} className="my-8">
                        <h3 className="text-xl font-semibold my-2">{compData.title}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6">
                            {Object.entries(compData.inputs).map(([inputName, inputData], idx) => (
                                <div key={idx} className="mb-4 relative">
                                    <label className="block mb-1">{inputData.label}:</label>
                                    {
                                        inputData.type === "select" ?
                                            <SelectComp {...{ compKey, inputName, inputData, register, darkTheme }} /> :
                                            inputData.type === "password" ?
                                                <PasswordComp {...{ compKey, inputName, inputData, register, watch, showPassword, setShowPassword, darkTheme }} /> :
                                                <InputComp {...{ compKey, inputName, inputData, register, darkTheme }} />
                                    }
                                    {errors[compKey] && errors[compKey][inputName] && <p className="text-red-500 text-sm">
                                        {errors[compKey][inputName].message}
                                    </p>}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded font-semibold transition-colors ${darkTheme ? 'bg-blue-600 hover:bg-blue-700 text-gray-100 disabled:bg-blue-400' : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300'}`}
            >
                {isSubmitting ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

const InputComp = ({ compKey, inputName, inputData, register, darkTheme }) => {
    return (
        <input
            type={inputData.type}
            {...register(`${compKey}.${inputName}`, inputData.rules)}
            placeholder={inputData.placeholder}
            className={`w-full px-3 py-2 border rounded ${darkTheme ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
        />
    );
};

const PasswordComp = ({ compKey, inputName, inputData, register, watch, showPassword, setShowPassword, darkTheme }) => {
    return (
        <div className="relative">
            <input
                type={inputName !== "password" || !showPassword ? inputData.type : "text"}
                {...register(`${compKey}.${inputName}`, {
                    ...inputData.rules,
                    validate: inputName === "confirmPassword" ? value => value === watch(`${compKey}.password`) || "Passwords do not match" : undefined
                })}
                placeholder={inputData.placeholder}
                className={`w-full px-3 py-2 border rounded ${darkTheme ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
            />
            {inputName === "password" && (
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-xl">
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
            )}
        </div>
    );
};

const SelectComp = ({ compKey, inputName, inputData, register, darkTheme }) => {
    return (
        <select
            {...register(`${compKey}.${inputName}`)}
            className={`w-full px-3 py-2 border rounded ${darkTheme ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
        >
            {inputData.options.map((optionName, index) => (
                <option key={index} value={optionName}>{optionName}</option>
            ))}
        </select>
    );
};

export default Signup;
