import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [ reload, setReload ] = useState(false);

    return (
        <UserContext.Provider value={{ reload, setReload }}>
            {children}
        </UserContext.Provider>
    );
};