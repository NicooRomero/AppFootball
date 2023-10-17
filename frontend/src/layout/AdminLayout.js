import React, { useEffect, useState } from 'react';
import Nav from '@/components/admin/Nav';
import Router from 'next/router'
import useAuth from '@/hooks/useAuth';
import { getAccToken } from '@/api/auth';

export default function AdminLayout({ children }) {
    const { user, isLoading } = useAuth();
    // console.log(user);
    // console.log(isLoading);

    useEffect(() => {
            const token = getAccToken()
            if (!token) {
                typeof window !== 'undefined' && Router.push('/admin/login');
            }
    }, [])

    // if (!user && isLoading) {
    //     typeof window !== 'undefined' && Router.push('/admin/login');
    // }

    if (user && !isLoading) {
        return (
            <div className='bg-gray-950 min-h-screen flex '>
                <Nav />
                <div className="text-black bg-gray-950 flex-grow mt-12 ml-52 p-4">
                    {children}
                </div>
            </div>
        )
    }
}