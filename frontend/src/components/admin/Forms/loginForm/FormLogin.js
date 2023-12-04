import React, { useState } from 'react';
import { LoginApi } from '@/api/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import BasicModal from '@/components/Modal/BasicModal';
import UserForm from '../userForm/UserForm';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';

const error = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400';
const success = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

export default function LoginForm() {

    const [showModalLogin, setShowModalLogin] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            const result = await LoginApi(formData);
            if (result?.status === 200) {
                const { accessToken, refreshToken } = result.data;

                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshToken);

                toast.success('Login correcto.');

                setTimeout(() => window.location = '/admin/dashboard', 1000);

            } else {
                toast.error(result.response.data.message)
            }
        }
    })

    return (
        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign in to Tournament Panel
            </h2>
            <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email </label>
                    <input type="email" name="email" id="email" onChange={formik.handleChange} className={formik.errors.email ? error : success} placeholder="name@company.com" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password </label>
                    <input type="password" name="password" id="password" onChange={formik.handleChange} placeholder="••••••••" className={formik.errors.password ? error : success} />
                </div>
                <div className="flex items-start">
                </div>
                <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                <div onClick={() => setShowModalLogin(true)} className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">
                    Not registered yet? <a className="text-blue-600 hover:underline dark:text-blue-500">Create account</a>
                </div>
            </form>
            <BasicModal
                show={showModalLogin}
                setShow={setShowModalLogin}
                title={'Create new user'}
            >
                <UserForm setShowModalLogin={setShowModalLogin} />
            </BasicModal>
        </div>
    )
}

function initialValues() {
    return {
        email: '',
        password: ''
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
    }
}
