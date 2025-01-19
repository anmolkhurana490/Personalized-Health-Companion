import React, { useState } from 'react';
import { useForm } from "react-hook-form"

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const onSubmit = (e) => {
        console.log(e)
    }

    return (
        <div className="w-2/5 space-y-16">
            <h1 className='text-4xl font-bold text-center'>Login To Your Account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-200 bg-opacity-70 text-lg p-6 rounded shadow-md w-full">

                <div className="mb-4">
                    <label className="block text-gray-800">Role:</label>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            {...register("role", { required: true })}
                            value="admin"
                            className="mr-2"
                        />
                        <label className="mr-4">Admin</label>
                        <input
                            type="radio"
                            {...register("role", { required: true })}
                            value="doctor"
                            className="mr-2"
                        />
                        <label className="mr-4">Doctor</label>
                        <input
                            type="radio"
                            {...register("role", { required: true })}
                            value="patient"
                            defaultChecked
                            className="mr-2"
                        />
                        <label>Patient</label>
                    </div>
                </div>

                <div className="mb-4">
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
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-800">Password:</label>
                    <input
                        type="password"
                        {...register("password", {
                            minLength: {value: 4, message: "Password must be at least 4 characters"},
                            maxLength: {value: 9, message: "Password  cannot exceed 8 characters"},
                            required: "Password is Required"
                        })}
                        placeholder='Enter Your Password'
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                {<p className="text-red-500"></p>}
                <input type='submit' className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700' />
            </form>
        </div>
    );
};

export { Login };