import { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import form_data from '../../Auth_Components/formComponent_data';
import axios from "axios";
import { AppContext } from "../../../AppProvider";

const backendURL = "https://personalized-health-companion-backend.vercel.app";

const Profile = ({ profile, setProfile, currRole }) => {
    const { darkTheme } = useContext(AppContext);

    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if (profile) {
            Object.keys(profile.personal_info).forEach(key => {
                if (key === "dateOfBirth")
                    setValue(`personal_info.${key}`, profile.personal_info[key].substr(0, 10));
                else setValue(`personal_info.${key}`, profile.personal_info[key]);
            });
            Object.keys(profile.health_info).forEach(key => {
                setValue(`health_info.${key}`, profile.health_info[key]);
            });
            Object.keys(profile.emergency_contact).forEach(key => {
                setValue(`emergency_contact.${key}`, profile.emergency_contact[key]);
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
            health_info: {
                ...profile.health_info,
                ...data.health_info,
            },
            emergency_contact: {
                ...profile.emergency_contact,
                ...data.emergency_contact,
            },
        };

        try {
            const response = await axios.post(`${backendURL}/dashboard/profile`, { ...newProfileData, role: currRole }, {
                withCredentials: true
            });
            if (response.data.status === 'success') {
                setProfile(newProfileData);
                setEditMode(false);
            } else {
                console.log("Save Profile Failed:", response.data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className={`max-h-full overflow-auto custom-scrollbar ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} rounded shadow p-4`}>
            <div className="w-full flex flex-col md:flex-row justify-between items-center p-4">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-semibold">{profile?.personal_info?.fullName}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{profile?.personal_info?.email}</p>
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className={`mt-4 px-4 py-2 rounded ${darkTheme ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                    >
                        {editMode ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                <img
                    src={`/profilePicture/${profile?.profilePicture}`}
                    alt="Not Found"
                    onError={(e) => { e.target.src = '/profilePicture/default-profile-picture.jpg'; }}
                    className="w-32 h-32 object-cover rounded-full mt-4 md:mt-0"
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                {['personal_info', 'health_info', 'emergency_contact'].map((compKey, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-semibold my-4">{form_data['user'][compKey].title}</h3>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4'>
                            {Object.entries(form_data['user'][compKey].inputs).map(([inputName, inputData], idx) => (
                                <div key={idx} className="mb-4 relative">
                                    <label className="block">{inputData.label}:</label>
                                    {inputData.type === "select" ? (
                                        <select
                                            {...register(`${compKey}.${inputName}`, inputData.rules)}
                                            disabled={!editMode}
                                            className={`w-full mt-1 p-2 border rounded ${darkTheme ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-300 bg-white text-gray-900"}`}
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
                                            className={`w-full mt-1 p-2 border rounded ${darkTheme ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-300 bg-white text-gray-900"}`}
                                            placeholder={inputData.placeholder}
                                        />
                                    )}
                                    {errors[`${compKey}.${inputName}`] && <p className="text-red-500">{errors[`${compKey}.${inputName}`].message}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {editMode && (
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-4 py-2 rounded ${darkTheme ? "bg-green-600 hover:bg-green-700 disabled:bg-green-800" : "bg-green-500 hover:bg-green-600 disabled:bg-green-700"} text-white`}
                    >
                        Save Changes
                    </button>
                )}
            </form>
        </div>
    );
};

export default Profile;
