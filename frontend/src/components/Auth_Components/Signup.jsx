import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import form_data from "./formComponent_data"

import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import 'react-tabs/style/react-tabs.css';
import "../styles.css"
import { signupSubmit } from './handlers';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const roles = ['doctor', 'user']
    const [selectedRole, setSelectedRole] = useState("user")

    const handleTabSelect = (index) => {
        const role = roles[index]
        setSelectedRole(role);
    }

    const navigate = useNavigate();

    return (
        <div className="w-4/5 space-y-16">
            <h1 className='text-4xl font-bold text-center'>Register Your New Account</h1>

            <div className="bg-gray-200/70 text-lg p-6 rounded shadow-md w-full">
                <Tabs selectedIndex={roles.indexOf(selectedRole)} onSelect={handleTabSelect}>
                    <TabList className="flex w-full mb-4 font-semibold">
                        {/* <Tab className="role-tab flex-grow text-center py-1">Admin</Tab> */}
                        <Tab className="role-tab flex-grow text-center py-1">Doctor</Tab>
                        <Tab className="role-tab flex-grow text-center py-1">User</Tab>
                    </TabList>

                    {/* <TabPanel>
                        <h2 className='text-2xl font-bold text-center'>Admin Register</h2>
                    </TabPanel> */}
                    <TabPanel>
                        <h2 className='text-2xl font-bold text-center'>Doctor Register</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2 className='text-2xl font-bold text-center'>User Register</h2>
                    </TabPanel>
                </Tabs>

                {
                    // selectedRole == "admin" ? <AdminComponent onSubmit={(data)=>signupSubmit(data, navigate)} /> :
                    selectedRole == "doctor" ? <DoctorComponent onSubmit={(data) => signupSubmit(data, navigate)} /> :
                        <UserComponent onSubmit={(data) => signupSubmit(data, navigate)} />
                }
            </div>
        </div>
    );
};


// const AdminComponent = ({ onSubmit }) => {
//     const { register, formState: { errors, isSubmitting }, handleSubmit, watch } = useForm()
//     const [showPassword, setShowPassword] = useState(false)

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//             <input type="hidden" {...register("role", { required: true })} value={"admin"} />

//             {
//                 Object.entries(form_data["admin"]).map(([compKey, compData], index) => (
//                     <div key={index} className="my-8">
//                         <h3 className="text-xl font-semibold my-2">{compData.title}</h3>

//                         <div className='grid grid-cols-3 gap-x-10 gap-y-6'>
//                             {Object.entries(compData.inputs).map(([inputName, inputData], idx) => (
//                                 <div key={idx} className="mb-4 relative">
//                                     <label className="block text-gray-800">{inputData.label}:</label>
//                                     {
//                                         inputData.type == "select" ?
//                                             <SelectComp {...{ compKey, inputName, inputData, register }} /> :
//                                             inputData.type == "password" ?
//                                                 <PasswordComp {...{ compKey, inputName, inputData, register, watch, showPassword, setShowPassword }} /> :
//                                                 <InputComp {...{ compKey, inputName, inputData, register }} />
//                                     }
//                                     {errors[compKey] && errors[compKey][inputName] && <p className="text-red-500 text-base">
//                                         {errors[compKey][inputName].message}
//                                     </p>}
//                                 </div>
//                             ))}
//                         </div>

//                     </div>
//                 ))
//             }

//             <input type='submit' disabled={isSubmitting} className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400' />
//         </form>
//     )
// }

const DoctorComponent = ({ onSubmit }) => {
    const { register, formState: { errors, isSubmitting }, handleSubmit, watch } = useForm()
    const [showPassword, setShowPassword] = useState(false)

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <input type="hidden" {...register("role", { required: true })} value={"doctor"} />

            {
                Object.entries(form_data["doctor"]).map(([compKey, compData], index) => (
                    <div key={index} className="my-8">
                        <h3 className="text-xl font-semibold my-2">{compData.title}</h3>

                        <div className='grid grid-cols-3 gap-x-10 gap-y-6'>
                            {Object.entries(compData.inputs).map(([inputName, inputData], idx) => (
                                <div key={idx} className="mb-4 relative">
                                    <label className="block text-gray-800">{inputData.label}:</label>
                                    {
                                        inputData.type == "select" ?
                                            <SelectComp {...{ compKey, inputName, inputData, register }} /> :
                                            inputData.type == "password" ?
                                                <PasswordComp {...{ compKey, inputName, inputData, register, watch, showPassword, setShowPassword }} /> :
                                                <InputComp {...{ compKey, inputName, inputData, register }} />
                                    }
                                    {errors[compKey] && errors[compKey][inputName] && <p className="text-red-500 text-base">
                                        {errors[compKey][inputName].message}
                                    </p>}
                                </div>
                            ))}
                        </div>

                    </div>
                ))
            }

            <input type='submit' disabled={isSubmitting} className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400' />
        </form>
    )
}

const UserComponent = ({ onSubmit }) => {
    const { register, formState: { errors, isSubmitting }, handleSubmit, watch } = useForm()
    const [showPassword, setShowPassword] = useState(false)

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <input type="hidden" {...register("role", { required: true })} value={"user"} />

            {
                Object.entries(form_data["user"]).map(([compKey, compData], index) => (
                    <div key={index} className="my-8">
                        <h3 className="text-xl font-semibold my-2">{compData.title}</h3>

                        <div className='grid grid-cols-3 gap-x-10 gap-y-6'>
                            {Object.entries(compData.inputs).map(([inputName, inputData], idx) => (
                                <div key={idx} className="mb-4 relative">
                                    <label className="block text-gray-800">{inputData.label}:</label>
                                    {
                                        inputData.type == "select" ?
                                            <SelectComp {...{ compKey, inputName, inputData, register }} /> :
                                            inputData.type == "password" ?
                                                <PasswordComp {...{ compKey, inputName, inputData, register, watch, showPassword, setShowPassword }} /> :
                                                <InputComp {...{ compKey, inputName, inputData, register }} />
                                    }
                                    {errors[compKey] && errors[compKey][inputName] && <p className="text-red-500 text-base">
                                        {errors[compKey][inputName].message}
                                    </p>}
                                </div>
                            ))}
                        </div>

                    </div>
                ))
            }

            <input type='submit' disabled={isSubmitting} className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400' />
        </form>
    )
}

const InputComp = ({ compKey, inputName, inputData, register }) => {
    return (
        <>
            <input
                type={inputData.type}
                {...register(`${compKey}.${inputName}`, inputData.rules)
                }
                placeholder={inputData.placeholder}
                className="w-full px-3 py-2 border rounded"
            />
        </>
    )
}

const PasswordComp = ({ compKey, inputName, inputData, register, watch, showPassword, setShowPassword }) => {
    return (
        <>
            <input
                type={inputName != "password" || !showPassword ? inputData.type : "text"}
                {...register(`${compKey}.${inputName}`, {
                    ...inputData.rules,
                    validate: inputName == "confirmPassword" ? value => value === watch(`${compKey}.password`) || "Passwords do not match" : undefined
                })
                }
                placeholder={inputData.placeholder}
                className="w-full px-3 py-2 border rounded"
            />
            {
                inputName == "password" && <button onClick={() => setShowPassword(!showPassword)} className='absolute right-0 text-3xl px-4 py-2'>
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
            }
        </>
    )
}

const SelectComp = ({ compKey, inputName, inputData, register }) => {
    return (
        <select {...register(`${compKey}.${inputName}`)} className="w-full px-3 py-2 border rounded">
            {inputData.options.map((optionName, index) => (
                <option key={index} value={optionName}>{optionName}</option>
            ))}
        </select>
    )
}

export default Signup;