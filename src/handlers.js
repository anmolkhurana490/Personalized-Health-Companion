import axios from "axios";

export const getProfile = (setProfile, setLoggedIn, setCurrRole) => {
    axios.get('http://localhost:3000/dashboard/profile', { withCredentials: true })
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