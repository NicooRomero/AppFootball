import React from 'react';
import AdminLayout from '@/layout/AdminLayout';
import Notifications from '@/components/admin/notifications/Notifications';


export default function Dashboard() {

    return (
        <AdminLayout>
            <div className="p-4">
                <div className="grid grid-cols-3 grid-rows-6 gap-4 mb-4 w-full h-screen">
                    <div className="row-start-1 row-end-3 flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                            1
                        </p>
                    </div>
                    <div className="row-start-1 row-end-3 flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                            2
                        </p>
                    </div>
                    <div className="row-start-1 row-end-4 flex flex-col p-4 rounded bg-gray-50 dark:bg-gray-800">
                        <h1 className='text-3xl font-semibold whitespace-nowrap text-white'>All notifications</h1>
                        <div className="p-2 overflow-x-auto">
                            <div >
                                <Notifications />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
