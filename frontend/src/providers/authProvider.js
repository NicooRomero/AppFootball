"use client";
import React, { useEffect, useState, createContext } from 'react';
import { getAccToken, getRefToken, refreshAccessToken, logout } from '@/api/auth';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export default function AuthProvider(props) {
    const { children } = props;

    const [user, setUser] = useState({
        user: null,
        isLoading: true
    });

    useEffect(() => {
        checkUserLogin(setUser);
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
}

async function checkUserLogin(setUser) {
    const accessToken = getAccToken();

    if (!accessToken) {
        const refreshToken = getRefToken();

        if (!refreshToken) {
            logout();
            setUser({
                user: null,
                isLoading: true
            });
        } else {
            try {
                const newAccessToken = await refreshAccessToken(refreshToken);
                if(newAccessToken) {
                    setUser({
                        isLoading: false,
                        user: jwtDecode(newAccessToken)
                    });
                } else {
                    setUser({
                        user: null,
                        isLoading: true
                    });
                    logout();
                }
            } catch (error) {
                logout();
                setUser({
                    user: null,
                    isLoading: true
                });
            }
        }
    } else {
        if(accessToken) {
            setUser({
                isLoading: false,
                user: jwtDecode(accessToken)
            });
        } else {
            logout();
            setUser({
                user: null,
                isLoading: true
            });
        }        
    }
}

