import React from 'react';
import moment from 'moment';

export default function Player(props) {

    const { data } = props;

    return (
        <div className="mx-auto right-0 w-60">
            <div className="rounded overflow-hidden">
                <div className="text-center p-6 border-b">
                    <img className="w-20 h-20 mx-auto rounded" src={data.image} alt="Large avatar" />
                    <p className="pt-2 text-lg font-semibold text-gray-50">{data.name} {data.lastname}</p>
                    <p className="text-sm text-gray-100">{data.email}</p>
                    <div className="mt-5">
                        <div
                            className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100 hover:bg-gray-800"
                        >
                            {data.team?.name || 'No team yet'}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="px-4 py-2 hover:bg-gray-800 flex items-center">
                        <div className="text-green-600">
                            <span className="flex w-3 h-3 bg-blue-600 rounded-full"></span>
                        </div>
                        <div className="pl-3">
                            <p className="text-sm font-medium text-gray-200 leading-none">
                                {data.position}
                            </p>
                            <p className="text-xs text-gray-500">Position</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="px-4 py-2 hover:bg-gray-800 flex items-center">
                        <div className="text-gray-800">
                            <span className="flex w-3 h-3 bg-blue-600 rounded-full"></span>
                        </div>
                        <div className="pl-3">
                            <p className="text-sm font-medium text-gray-200 leading-none">{data.nationality}</p>
                            <p className="text-xs text-gray-500">Nationality</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="px-4 py-2 hover:bg-gray-800 flex items-center">
                        <div className="text-gray-800">
                            <span className="flex w-3 h-3 bg-blue-600 rounded-full"></span>
                        </div>
                        <div className="pl-3">
                            <p className="text-sm font-medium text-gray-200 leading-none">{data.height} cm</p>
                            <p className="text-xs text-gray-500">Height</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="px-4 py-2 hover:bg-gray-800 flex border-b items-center">
                        <div className="text-gray-800">
                            <span className="flex w-3 h-3 bg-blue-600 rounded-full"></span>
                        </div>
                        <div className="pl-3">
                            <p className="text-sm font-medium text-gray-200 leading-none">{moment(data.birthday).format('YYYY')}</p>
                            <p className="text-xs text-gray-500">Year</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="px-4 py-2 hover:bg-gray-800 flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" onClick={e => console.log(e.target)} value={false} className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Small toggle</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
