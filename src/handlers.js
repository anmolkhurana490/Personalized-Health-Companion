import { useContext } from "react";
import { AppContext } from "./AppProvider";
import axios from "axios";

export const getProfile = (setProfile, setLoggedIn) => {
    axios.get('http://localhost:3000/authenticate/profile', { withCredentials: true })
        .then(response => {
            if (response.data.status === 'success') {
                setProfile(response.data.profile);
                setLoggedIn(true);
            }
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
        });
}