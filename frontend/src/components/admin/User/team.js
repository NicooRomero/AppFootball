import React from 'react';
import noTeamImg from '../../../../public/png/no-team.png';

export default function Team(props) {

    const { data } = props;

    return (
        <div>
            <div className="flex flex-col h-full rounded-lg shadow-md border-gray-700 bg-gray-900">
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Your Team</h5>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-10 h-10 rounded-full" src={data.team ? data.team.image : noTeamImg.src} alt="Team image" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className='flex items-center'>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {data.team ? data.team.name : 'You are not in any team yet.'}
                                                </p>
                                                <p className="flex items-center text-sm text-gray-500 truncate dark:text-gray-400">
                                                    Total Players: {data.team ? data.team.players.length : null}
                                                </p>
                                            </div>
                                            {data.team ?
                                                <p className="flex items-center text-sm text-gray-500 truncate dark:text-gray-400 ml-16">
                                                    <span className="flex w-2 h-2 text-sm bg-green-500 rounded-full mx-1"></span> W {data.team.win}
                                                    <span className="flex w-2 h-2 text-sm bg-gray-900 rounded-full dark:bg-gray-700 mx-1"></span> D {data.team.tie}
                                                    <span className="flex w-2 h-2 text-sm bg-red-500 rounded-full mx-1"></span> L {data.team.lose}
                                                </p>
                                                : null}
                                        </div>
                                    </div>
                                    {data.team ?
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            <button onClick={() => console.log('dejar equipo')} className="hover:bg-red-300 hover:text-red-900 ease-in-out duration-500  text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-red-900 text-red-300">Leave</button>
                                        </div>
                                        : null}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
