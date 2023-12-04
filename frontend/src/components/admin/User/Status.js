import React, { useEffect, useState } from 'react';
import { setStatusApi } from '@/api/user';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useRouter } from 'next/router';

export default function Status(props) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const { data: { status }, setReloadUser } = props;
    const router = useRouter();
    const { query } = router;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    var today = moment(Date.now()).format('YYYY-MM-DD');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var dateSeted = status?.toDate != null ? moment(status?.toDate).format('YYYY-MM-DD') : null; //'2023-10-31T22:31:37-03:00'
    
    useEffect(() => {
        (async () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (dateSeted && dateSeted > today) {
                    toast.error('You are currently suspended to play!', {
                        icon: '❗',
                    });
                    setReloadUser(true)     
            } else {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                if(status?.enabled === false) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    const idUser = query.user;
                    const data = {
                        newState: true,
                        newDate: null
                    }          
                    const result = await setStatusApi(idUser, data)
                        if(result.status === 200) {
                            toast.success(result.data.message, {
                                icon: '✅',
                            });
                        } else {
                            toast.error(result.data.message, {
                                icon: '❗',
                            }); 
                        }              
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setReloadUser(true);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
     
    return (
        <div className="flex flex-col h-full rounded-lg shadow-md border-gray-700 bg-gray-900">
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Player status</h5>
                {/* eslint-disable-next-line react-hooks/exhaustive-deps */}
                {status?.enabled ?
                    <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">All good!</span> You are currently enabled to play.
                        </div>
                    </div>
                    :
                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Warning!</span> You are currently suspended to play.
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}
