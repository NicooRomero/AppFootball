import React, { useState } from 'react';
import BasicModal from '@/components/Modal/BasicModal';
import UserForm from '../Forms/userForm/UserForm';

export default function Basic(props) {

    const { data, setReloadUser } = props;

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    };

    return (
        <>
            <div className="flex justify-end px-4 pt-4">
                <div className="flex flex-col items-center mt-4 pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={data.image} alt="Profile image" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name} {data.lastname}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{data.email}</span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <button onClick={handleClick} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit profile</button>
                    </div>
                </div>
            </div>
            <BasicModal show={showModal} setShow={setShowModal} title={'Edit player data'} >
                <UserForm data={data} setShowModal={setShowModal} setReloadUser={setReloadUser} />
            </BasicModal>
        </>
    )
}
