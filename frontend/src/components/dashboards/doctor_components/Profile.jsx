import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import form_data from '../../Auth_Components/formComponent_data';

const backendURL = "https://personalized-health-companion-backend.vercel.app";

const Profile = ({ profile, setProfile, currRole }) => {
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if (profile) {
            Object.keys(profile.personal_info).forEach(key => {
                setValue(`personal_info.${key}`, profile.personal_info[key]);
            });
            Object.keys(profile.professional_info).forEach(key => {
                setValue(`professional_info.${key}`, profile.professional_info[key]);
            });
            Object.keys(profile.availability).forEach(key => {
                setValue(`availability.${key}`, profile.availability[key]);
            });
            Object.keys(profile.optional).forEach(key => {
                setValue(`optional.${key}`, profile.optional[key]);
            });
        }
    }, [profile, setValue]);

    const onSubmit = async (data) => {
        const newProfileData = {
            ...profile,
            personal_info: {
                ...profile.personal_info,
                ...data.personal_info,
            },
            professional_info: {
                ...profile.professional_info,
                ...data.professional_info,
            },
            availability: {
                ...profile.availability,
                ...data.availability,
            },
            optional: {
                ...profile.optional,
                ...data.optional,
            },
        }

        try {
            const response = await axios.post(`${backendURL}/dashboard/profile`, { ...newProfileData, role: currRole }, {
                withCredentials: true
            });
            if (response.data.status === 'success') {
                setProfile(newProfileData);
                setEditMode(false);
            } else {
                console.log("Save Profile Failed:", response.data.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="max-h-screen overflow-auto custom-scrollbar bg-white rounded shadow p-4">
            <div className="w-full flex justify-between items-center p-4">
                <div>
                    <h2 className="text-2xl font-semibold">{profile?.personal_info?.fullName}</h2>
                    <p className="text-gray-600">{profile?.personal_info?.email}</p>
                    <button onClick={() => setEditMode(!editMode)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        {editMode ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                <img
                    src={`/profilePicture/${profile?.profilePicture}`}
                    alt="Not Found"
                    onError={(e) => { e.target.src = '/profilePicture/default-profile-picture.jpg'; }}
                    className="w-32 h-32 object-cover rounded-full"
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                {['personal_info', 'professional_info', 'availability', 'optional'].map((compKey, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-semibold my-4">{form_data['doctor'][compKey].title}</h3>

                        <div className='grid grid-cols-3 gap-x-10 gap-y-2'>
                            {Object.entries(form_data['doctor'][compKey].inputs).map(([inputName, inputData], idx) => (
                                inputData.type !== "file" && (
                                    <div key={idx} className="mb-4 relative">
                                        <label className="block text-gray-700">{inputData.label}:</label>
                                        {inputData.type === "select" ? (
                                            <select
                                                {...register(`${compKey}.${inputName}`, inputData.rules)}
                                                disabled={!editMode}
                                                className="w-full mt-1 p-2 border border-gray-300 rounded"
                                            >
                                                {inputData.options.map((option, i) => (
                                                    <option key={i} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={inputData.type}
                                                {...register(`${compKey}.${inputName}`, inputData.rules)}
                                                disabled={!editMode || inputData.disabled}
                                                className="w-full mt-1 p-2 border border-gray-300 rounded"
                                                placeholder={inputData.placeholder}
                                            />
                                        )}
                                        {errors[`${compKey}.${inputName}`] && <p className="text-red-500">{errors[`${compKey}.${inputName}`].message}</p>}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
                {editMode && <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-green-500 disabled:bg-green-700 text-white rounded hover:bg-green-600">Save Changes</button>}
            </form>
        </div>
    );
};

export default Profile;
