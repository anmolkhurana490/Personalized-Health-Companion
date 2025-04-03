import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [profile, setProfile] = useState(null);
    const [darkTheme, setDarkTheme] = useState(false);
    const [currRole, setCurrRole] = useState('')

    return (
        <AppContext.Provider value={{ loggedIn, setLoggedIn, profile, setProfile, darkTheme, setDarkTheme, currRole, setCurrRole }}>
            {children}
        </AppContext.Provider>
    );
};