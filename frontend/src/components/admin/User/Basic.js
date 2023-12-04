import React, { useState } from 'react';
import BasicModal from '@/components/Modal/BasicModal';
import UserForm from '../Forms/userForm/UserForm';
import ImageForm from '../Forms/imageForm/ImageForm';
import Image from 'next/image';
import NoImageProfile from '../../../../public/png/no-profile.png';

export default function Basic(props) {
    
    const { data, setReloadUser } = props;

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [component, setComponent] = useState(null);

    const handleClick = (id) => {
        if(id === 1) {
            setTitle('Edit player data');
            setComponent(<UserForm data={data} setShowModal={setShowModal} setReloadUser={setReloadUser} />)
        } else {
            setTitle('Edit image player');
            setComponent(<ImageForm setShowModal={setShowModal} setReloadUser={setReloadUser} document={data?.document} />)
        }
        setShowModal(true);
    };

    return (
        <>
            <div className="flex justify-end px-4 pt-4">
                <div className="flex flex-col items-center mt-4 pb-10">
                    <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src={data.image ? data.image  : NoImageProfile.src} alt="Profile image" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name} {data.lastname}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{data.email}</span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <button onClick={() => handleClick(1)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit profile</button>
                        <button onClick={() => handleClick(2)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit image</button>
                    </div>
                </div>
            </div>
            <BasicModal show={showModal} setShow={setShowModal} title={title} >
                {component}
            </BasicModal>
        </>
    )
}
