import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [profile, setProfile] = useState(null);
    const [darkTheme, setDarkTheme] = useState(false);

    return (
        <AppContext.Provider value={{ loggedIn, setLoggedIn, profile, setProfile, darkTheme, setDarkTheme }}>
            {children}
        </AppContext.Provider>
    );
};