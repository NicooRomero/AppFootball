import React from 'react';
import moment from 'moment';

export default function ListPlayers(props) {

    const { teamPlayers } = props;

    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Player name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Position
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Document
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Years
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {teamPlayers.map((player, index) => (
                        <tr key={index} className="border-gray-700 border-b">
                            <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                            <img className="w-10 h-10 rounded-lg mr-4" src={player.image} alt={index} />
                                {player.name} {player.lastname}
                            </th>
                            <td className="px-6 py-4">
                                {player.position}
                            </td>
                            <td className="px-6 py-4">
                                {player.document}
                            </td>
                            <td className="px-6 py-4">
                                {moment().diff(player.birthday, 'years')} Years
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

{/* <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {teamPlayers.map((player, index) => (
                <ul key={index}>
                    <li className="pb-3 sm:pb-4 mt-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded" src={player.image} alt={player.namae} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {player.name} {player.lastname}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {player.position}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                                {moment().diff(player.birthday, 'years')} Years
                            </div>
                        </div>
                    </li>
                </ul>
            ))}
        </div> */}
