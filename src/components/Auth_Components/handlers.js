import { useContext } from "react";
import { AppContext } from "../../AppProvider";
import axios from "axios";

export const loginSubmit = async (data, setProfile, setLoggedIn, setError, navigate) => {
    try {
        const response = await axios.post('http://localhost:3000/authenticate/login', data, {
            withCredentials: true
        });
        if (response.data.status === 'success') {
            // Handle successful login
            // console.log(response.data.profile)
            setProfile(response.data.profile);
            setLoggedIn(true);
            navigate(`/dashboard/${response.data.role}`)
        } else {
            setError("loginError", { type: 'custom', message: response.data.message });
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const signupSubmit = async (data, navigate) => {
    delete data.authentication_details.confirmPassword;

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            Object.entries(value).forEach(([subKey, subValue]) => {
                if (typeof subValue === 'object' && subValue !== null) {
                    formData.append(`${key}[${subKey}]`, subValue[0]);
                }
                else formData.append(`${key}[${subKey}]`, subValue);

            });
        } else {
            formData.append(key, value);
        }
    });

    await axios.post(`http://localhost:3000/authenticate/signup/${data.role}`, formData)
        // .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate(`/login`);
            alert('You have Successfully Signed In! Its Time to Login In');
        })
        .catch(error => console.error(error));
}

export const logoutHandler = async (setLoggedIn, setProfile, navigate) => {
    await axios.get(`http://localhost:3000/dashboard/logout`, {
        withCredentials: true
    })
        // .then(response => response.json())
        .then(data => {
            setLoggedIn(false);
            setProfile(null);
            navigate('/');

            alert('You have Successfully Logged Out!')
        })
        .catch(error => console.error(error));
};