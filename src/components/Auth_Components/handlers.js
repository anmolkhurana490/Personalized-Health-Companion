import { useContext } from "react";
import { AppContext } from "../../AppProvider";


export const loginSubmit = async (data, setProfile, setLoggedIn, setError) => {
    try {
        const response = await axios.post('http://localhost:3000/authenticate/login', data, {
            withCredentials: true
        });
        if (response.data.status === 'success') {
            // Handle successful login
            console.log(data)
            setProfile(response.data.profile);
            setLoggedIn(true);
        } else {
            setError("loginError", { type: 'custom', message: response.data.message });
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const signupSubmit = async (data) => {
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
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

export const logoutHandler = async (setLoggedIn, setProfile) => {
    setLoggedIn(false);
    setProfile(null);

    await axios.post(`http://localhost:3000/authenticate/logout`, formData)
        // .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
};