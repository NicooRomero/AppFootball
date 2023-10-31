import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { uploadAvatarApi } from '@/api/user';
import toast from 'react-hot-toast';

export default function ImageForm(props) {

    const { document, setReloadUser, setShowModal } = props;
    const [newImage, setNewImage] = useState(null);
    const [file, setFile] = useState(null);
    

    const router = useRouter();
    const { query } = router;

    const handleChange = async (e) => {
        const preview = e.target.files[0];
        setFile(preview);

        if (preview) {
            
            if (preview.size > 5 * 1024 * 1024) {
                toast.error('The file is too large. A maximum size of 5M is allowed');
                return;
            }

            if (preview.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = () => {
                    setNewImage(reader.result);
                };
                reader.readAsDataURL(preview);
            } else {
                toast.error('Only image files allowed (SVG, PNG, JPG o JPEG).');
            }
        }        
    };

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('document', document);
        formData.append('image', file);

        const result = await uploadAvatarApi(query.user, formData)
            if(result.status === 200) {
                toast.success(result.data.message)
            } else {
                toast.error('An error occurred while trying to upload the image.')
            }
        setReloadUser(true);
        setShowModal(false);
    }



    return (
        <div className="flex items-center justify-center w-full flex-col">
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
            >
                <div className="flex flex-col items-center justify-center p-6">
                    {newImage ? newImage && <img src={newImage} className='mb-6' alt="Preview" style={{ maxWidth: '50%', maxHeight: '200px' }} />
                        :
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                    }
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, or JPEG (MAX. 800x400px)
                    </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleChange} />
            </label>
            {
                newImage ?
                    <button onClick={() => onSubmit()} className="items-center px-4 py-2 text-sm font-medium mt-2 w-full text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Upload image
                    </button>
                    : null
            }

        </div>
    );
}
