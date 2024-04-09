import React from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { editApiPlayer } from '@/api/user';

export default function UserForm(props) {

    const { data, setShowModal, setReloadUser } = props;

    const router = useRouter();
    const { query } = router;

    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(validationSchema(data)),
        onSubmit: async (formData) => {
            const idUser = data._id ? data._id : query.user;
            if (data) {
                const result = await editApiPlayer(idUser, formData);
                if (result?.status === 200) {
                    setReloadUser(true);
                    toast.success(result.message);
                } else {
                    toast.error(result.message);
                }
            } else {
                // Set date format
                const date = formData.birthday;
                const dateFormat = moment(date).toISOString();
                formData.birthday = dateFormat
                console.log(formData);
                console.log('crear usuario')
            }
            setReloadUser(true);
            setShowModal(false);
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex gap-4'>
                    <div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={formik.handleChange} value={formik.values.name} type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={formik.handleChange} value={formik.values.lastname} type="text" name="lastname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Lastname</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            {data?.email ? <input onChange={formik.handleChange} value={data.email} type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                : <input onChange={formik.handleChange} value={formik.values.email} type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            }
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={formik.handleChange} value={formik.values.document} type="number" name="document" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Document</label>
                        </div>
                        {data === undefined ?
                            <div className="relative z-0 w-full mb-6 group">
                                <input onChange={formik.handleChange} value={formik.values.password} type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>
                            : null
                        }
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input onChange={formik.handleChange} value={formik.values.gender} type="text" name="gender" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                {data?.birthday ? <input onChange={formik.handleChange} value={moment(data.birthday).format('YYYY-MM-DD')} type="date" name="birthday" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                    : <input onChange={formik.handleChange} value={formik.values.birthday} type="date" name="birthday" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                }
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Birthday</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={formik.handleChange} value={formik.values.nationality} type="text" name="nationality" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label></div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={formik.handleChange} value={formik.values.province} type="text" name="province" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={formik.handleChange} value={formik.values.zip} type="number" name="zip" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Postal Code</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={formik.handleChange} value={formik.values.position} type="text" name="position" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Position</label>
                        </div>
                        {data === undefined ?
                            <div className="relative z-0 w-full mb-6 group">
                                <input onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="repassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Repeat password</label>
                            </div>
                            : null
                        }
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input onChange={formik.handleChange} value={formik.values.height} type="text" name="height" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Height</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input onChange={formik.handleChange} value={formik.values.phone} type="number" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{data ? 'Edit info' : 'Create user'}</button>
            </form>
        </div>
    )
}

function initialValues(data) {
    if (data) {
        return {
            name: data?.name || '',
            lastname: data?.lastname || '',
            email: data?.email || '',
            birthday: data?.birthday || '',
            document: data?.document || '',
            gender: data?.gender || '',
            position: data?.position || '',
            height: data?.height || '',
            phone: data?.phone || '',
            nationality: data?.nationality || '',
            province: data?.province || '',
            zip: data?.zip || ''
        }
    }
    return {
        name: data?.name || '',
        lastname: data?.lastname || '',
        email: data?.email || '',
        birthday: data?.birthday || '',
        document: data?.document || '',
        gender: data?.gender || '',
        position: data?.position || '',
        height: data?.height || '',
        phone: data?.phone || '',
        nationality: data?.nationality || '',
        province: data?.province || '',
        zip: data?.zip || '',
        password: '',
        repassword: ''
    }

}

function validationSchema(data) {
    if (data) {
        return {
            name: Yup.string().required(),
            lastname: Yup.string().required(),
            email: Yup.string().email(true).required(true),
            birthday: Yup.date().required(),
            document: Yup.number().required().positive(),
            gender: Yup.string().required(),
            position: Yup.string().required(),
            height: Yup.number().required().positive(),
            phone: Yup.number().required().positive(),
            nationality: Yup.string().required(),
            province: Yup.string().required(),
            zip: Yup.number().required().positive(),
        }
    }
    return {
        name: Yup.string().required(),
        lastname: Yup.string().required(),
        email: Yup.string().email(true).required(true),
        birthday: Yup.date().required(),
        document: Yup.number().required().positive(),
        gender: Yup.string().required(),
        position: Yup.string().required(),
        height: Yup.number().required().positive(),
        phone: Yup.number().required().positive(),
        nationality: Yup.string().required(),
        province: Yup.string().required(),
        zip: Yup.number().required().positive(),
        password: Yup.string().required(true).oneOf([Yup.ref('repassword')], true),
        repassword: Yup.string().required(true).oneOf([Yup.ref('password')], 'Las contraseñas no coinciden.')
    }
}
