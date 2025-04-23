import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const getProfile = (setProfile, setLoggedIn, setCurrRole) => {
    axios.get(`${backendURL}/dashboard/profile`, { withCredentials: true })
        .then(response => {
            if (response.data.status === 'success') {
                setProfile(response.data.profile);
                setLoggedIn(true);
                setCurrRole(response.data.role)
            }
            else setLoggedIn(false);
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
        });
}