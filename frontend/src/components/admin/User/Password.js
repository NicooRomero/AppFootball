import React, { useState } from 'react';
import { changePassword } from '@/api/user';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Password(props) {

    const { idUser } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData, { resetForm }) => {
            setLoading(true);
            const result = await changePassword(idUser, formData);
            if (result?.status === 200) {
                toast.success(result.data.message);
                resetForm();
                setLoading(false);
            } else {
                toast.error(result.message);
            }
            setLoading(false);
        }
    })

    return (
        <div className="flex flex-col h-full rounded-lg shadow-md border-gray-700 bg-gray-900">
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Password information</h5>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <div className='flex'>
                            <label className={formik.errors.currentPassword ? "block mb-2 text-sm font-medium text-red-500" : "block mb-2 text-sm font-medium text-white"}>Current Password</label>
                            {formik.errors ?
                                <span className="inline-flex items-center text-red-800 text-xs font-medium mr-2 px-2.5 mb-2 rounded-full dark:text-red-300">
                                    {formik.errors.currentPassword}
                                </span>
                                : null}
                        </div>
                        <input type="password" name="currentPassword" id="currentPassword" onChange={formik.handleChange} className="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" placeholder="***********" />
                    </div>
                    <div className='flex justify-between'>
                        <div className="w-[49%] mb-4">
                            <div className='flex'>
                                <label className={formik.errors.newPassword ? "block mb-2 text-sm font-medium text-red-500" : "block mb-2 text-sm font-medium text-white"}>New password</label>
                                {formik.errors ?
                                    <span className="inline-flex items-center text-red-800 text-xs font-medium mr-2 px-2.5 mb-2 rounded-full dark:text-red-300">
                                        {formik.errors.newPassword}
                                    </span>
                                    : null}
                            </div>
                            <input type="password" name="newPassword" id="newPassword" onChange={formik.handleChange} className="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" placeholder="***********" />
                        </div>
                        <div className="w-[49%] mb-4">
                            <div className='flex'>
                                <label className={formik.errors.reNewPassword ? "block mb-2 text-sm font-medium text-red-500" : "block mb-2 text-sm font-medium text-white"}>Repeat new password</label>
                                {formik.errors ?
                                    <span className="inline-flex items-center text-red-800 text-xs font-medium mr-2 px-2.5 mb-2 rounded-full dark:text-red-300">
                                        {formik.errors.reNewPassword}
                                    </span>
                                    : null}
                            </div>
                            <input type="password" name="reNewPassword" id="reNewPassord" onChange={formik.handleChange} error={formik.errors.reNewPassword} className="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" placeholder="***********" />
                        </div>
                    </div>
                    {loading ?
                        <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            Loading...
                        </button>
                        :
                        <button type="submit" className="text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Register new password</button>
                    }
                </form>
            </div>
        </div>
    )
}

function initialValues() {
    return {
        currentPassword: '',
        newPassword: '',
        reNewPassword: ''
    }
}

function validationSchema() {
    return {
        currentPassword: Yup.string().required('Por favor, ingrese su clave actual'),
        newPassword: Yup.string().required('Por favor, ingrese su clave nueva').oneOf([Yup.ref('reNewPassword')], 'Las contraseñas no coinciden.'),
        reNewPassword: Yup.string().required('Por favor, repita su clave nueva').oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden.')
    }
}
