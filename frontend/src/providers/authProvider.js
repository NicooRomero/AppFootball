import React, { useEffect, useState, createContext } from 'react';
import { getAccToken, getRefToken, refreshAccessToken, logout } from '@/api/auth';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export default function AuthProvider(props) {
    const { children } = props;
    const [ user, setUser ] = useState({
        user: null,
        isLoading: true
    });

    useEffect(() => {
        checkUserLogin(setUser);
    }, []);

    return <AuthContext.Provider value={user} >
                {children}
            </AuthContext.Provider>
}

function checkUserLogin(setUser) {
    const accessToken = getAccToken();

    if(!accessToken) {
        const refreshToken = getRefToken();

        if(!refreshToken) {
            logout();
            setUser({
                user: null,
                isLoading: false
            });
        } else {
            refreshAccessToken(refreshToken);
        }
    } else {
        setUser({
            isLoading: false,
            user: jwtDecode(accessToken)
        });
    }
}