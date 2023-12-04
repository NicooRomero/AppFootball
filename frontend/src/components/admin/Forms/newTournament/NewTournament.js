import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { addNewTournament } from "@/api/tournament";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Image from "next/image";

export default function NewTournament(props) {  

  const { teams, setReload, setShowModal } = props;
  const [newImage, setNewImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleChangeImg = async (e) => {
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

const formik = useFormik({
  initialValues: initialValues(),
  validationSchema: Yup.object(validationSchema()),
  onSubmit: async(formData) => {

    if(!file) {
      toast.error('Please select an image to upload.')
    } else {
      formData.image = file;
  
      const result = await addNewTournament(formData)
      if(result.status === 200) {
        toast.success(result.data.message);
        setReload(true);
        setShowModal(false);
      } else {
          toast.error('An error occurred while trying to create tournament.')
      }  

    }

  }
})

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tournament Name
            </label>
            <input
              type="text"
              id="name"
              name='name'
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Champions League"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Year season
            </label>
            <input
              type="text"
              id="last_name"
              name="season"
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="2022-23"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select the teams participants
          </label>
          <select
            multiple
            id="teams"
            name="participants"
            onChange={formik.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {teams.map((team, i) => (
              <option value={team._id} key={i}>{team.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select the last champion team
          </label>
          <select
            id="lastChampion"
            name="lastchampion"
            onChange={formik.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue>Choose one team</option>
            {teams.map((team, i) => (
              <option value={team._id} key={i}>{team.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <div className="flex items-center justify-center w-full">
            <label
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {newImage ? newImage && <Image src={newImage} alt="Preview" style={{ maxWidth: '40%', maxHeight: '150px' }} />
                :
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload image</span> or drag and
                  drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
                }
              <input id="dropzone-file" type="file" className="hidden" onChange={handleChangeImg} />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function initialValues() {
  return {
    name: '',
    season: '',
    participants: [],
    lastchampion: '',
    image: ''
  }
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    season: Yup.string().required(true),
    participants: Yup.array().required(true),
  }
}
