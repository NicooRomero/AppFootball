import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layout/AdminLayout';
import Notifications from '@/components/admin/notifications/Notifications';
import { getApiTotalCount } from '@/api/user';
import { useUserContext } from '@/hooks/UserContext';


export default function Dashboard() {

    const [total, setTotal] = useState();
    const { reload } = useUserContext();

    useEffect(() => {
      (async () => {
            const data = await getApiTotalCount()
            setTotal(data)
      })()
    }, [reload])
    

    return (
        <AdminLayout>
            <div className="p-4">
                <div className="grid grid-cols-3 grid-rows-6 gap-4 mb-4 w-full h-screen">
                    <div className="row-start-1 row-end-3 flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                        <div className="w-full p-2">
                            <div
                                className="flex flex-col px-6 py-10 overflow-hidden bg-gray-800 transition-all rounded-xl  duration-300 group">
                                <div className="flex flex-row justify-between items-center">
                                <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-all duration-300 group-hover:text-gray-50" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                    <path fill-rule="evenodd"
                                        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="inline-flex text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-200 sm:text-base">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500 transition-all duration-300 group-hover:text-gray-200"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    
                                </div>
                                </div>
                                {total ?
                                    <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 transition-all duration-300 group-hover:text-gray-50">{total.totalTeams}</h1>
                                : 
                                <div role="status">
                                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                </div>
                                }
                                <div className="flex flex-row justify-between transition-all duration-300 group-hover:text-gray-200">
                                <p>Total Teams</p>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 transition-all duration-300 group-hover:text-gray-200"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                        clip-rule="evenodd" />
                                    </svg>
                                </span>
                                </div>
                            </div>
                            </div>
                    </div>
                    <div className="row-start-1 row-end-3 flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                    <div className="w-full p-2">
                            <div
                                className="flex flex-col px-6 py-10 overflow-hidden bg-gray-800 transition-all duration-300 rounded-xl  group">
                                <div className="flex flex-row justify-between items-center">
                                <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-all duration-300 group-hover:text-gray-50" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                    <path fill-rule="evenodd"
                                        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="inline-flex text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-200 sm:text-base">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500 transition-all duration-300 group-hover:text-gray-200"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    
                                </div>
                                </div>
                                {total ?
                                    <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 transition-all duration-300 group-hover:text-gray-50">{total.totalPlayers}</h1>
                                : 
                                <div role="status">
                                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                </div>
                                }
                                <div className="flex flex-row justify-between transition-all duration-300 group-hover:text-gray-200">
                                <p>Total Players</p>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 transition-all duration-300 group-hover:text-gray-200"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                        clip-rule="evenodd" />
                                    </svg>
                                </span>
                                </div>
                            </div>
                            </div>
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
