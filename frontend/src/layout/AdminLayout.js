import React from 'react';
import Nav from '@/components/admin/Nav';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

export default function AdminLayout({ children }) {

    const { user, isLoading } = useAuth();

    if (!user & !isLoading) {
        const router = useRouter();
        router.push('/admin/login');
    }

    if (user && !isLoading) {
        return (
            <div className='bg-gray-950 w-screen min-h-screen flex '>                
                <Nav />
                <div className="text-black bg-gray-950 flex-grow mt-12 ml-52 mr-2 p-4">
                    {children}
                </div>
            </div>
        )
    }
}
