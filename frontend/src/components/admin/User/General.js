import React from 'react';
import moment from 'moment/moment';

export default function General(props) {

    const { data } = props;

    return (
        <div>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">General Information</h5>
                <p className="mb-3 font-normal text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <div className='flex mt-6'>
                    <dl className="w-[300px] text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        <div className="flex flex-col pb-3">
                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Country</dt>
                            <dd className="text-md font-semibold">{data.nationality}</dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">City</dt>
                            <dd className="text-md font-semibold">{data.province}</dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Zip/postal code</dt>
                            <dd className="text-md font-semibold">{data.zip}</dd>
                        </div>
                        <div className="flex flex-col pt-3">
                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Join Date</dt>
                            <dd className="text-md font-semibold">{moment(data.dateCreated).format('LL')}</dd>
                        </div>
                    </dl>
                    <dl className="w-[300px] ml-10 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        <div className="flex flex-col pb-3">
                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Gender</dt>
                            <dd className="text-md font-semibold">Male</dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Birthday</dt>
                            <dd className="text-md font-semibold">{moment(data.birthday).format('LL')}</dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Document</dt>
                            <dd className="text-md font-semibold">{data.document}</dd>
                        </div>
                        <div className="flex flex-col pt-3">
                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Phone Number</dt>
                            <dd className="text-md font-semibold">{data.phone}</dd>
                        </div>
                    </dl>
                    <dl className="w-[300px] ml-10 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        <div className="flex flex-col pb-3">
                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Age</dt>
                            <dd className="text-md font-semibold">{moment().diff(data.birthday,'years')}</dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Position</dt>
                            <dd className="text-md font-semibold">{data.position}</dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Height</dt>
                            <dd className="text-md font-semibold">{data.height} cm</dd>
                        </div>
                        <div className="flex flex-col pt-3">
                            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">Role</dt>
                            <dd className="text-md font-semibold">{data.teamLeader ? 'Team Leader' : 'Player'}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
