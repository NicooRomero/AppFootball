import React, { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { editTeamApi, addNewTeam } from "@/api/teams";
import { getApiPlayers } from "@/api/user";
import ImageForm from "../imageForm/ImageForm";
import NoTeamImg from "../../../../../public/png/no-team.png";
import Image from "next/image";

export default function TeamForm(props) {
  const inputError =
    "block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-white dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer";
  const inputNormal =
    "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

  const { team, setShowModal, setReloadTeams } = props;
  const [changeImage, setchangeImage] = useState(true);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getApiPlayers();
      setPlayers(res);
    })();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(team),
    validationSchema: Yup.object(validationSchema(team ? team : null)),
    onSubmit: async (formData) => {
      if (team) {
        const idUser = team._id;
        const result = await editTeamApi(idUser, formData);
        if (result?.status === 200) {
          setReloadTeams(true);
          toast.success(result.data.message);
        } else {
          toast.error(result.data.message);
        }
      } else {
        const result = await addNewTeam(formData);
        if (result?.status === 200) {
          setReloadTeams(true);
          toast.success(result.data.message);
        } else {
          toast.error(result.response.data.message);
        }
      }

      setShowModal(false);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {changeImage ? (
          <div className="flex items-center gap-4">
            {team ? (
              <div className="flex flex-col items-center gap-4 jçustify-center">
                <figure
                  onClick={() => setchangeImage(false)}
                  className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale-0 hover:grayscale"
                >
                  <Image
                    className="rounded-xl h-40 w-40"
                    src={team?.image || NoTeamImg.src}
                    alt={team?.name}
                  />
                </figure>
              </div>
            ) : null}
            <div className="flex flex-col">
              <div className="gap-8">
                <div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      type="text"
                      name="name"
                      className={formik.errors.name ? inputError : inputNormal}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Name
                    </label>
                  </div>
                </div>
              </div>
              {team ? null : (
                <div className="gap-8">
                  <div>
                    <div className="relative z-0 w-full mb-6 group">
                      <label className="block mb-2 text-sm font-medium text-gray-400 dark:gray-400">
                        Select team leader
                      </label>
                      <select
                        id="teamLeader"
                        onChange={formik.handleChange}
                        name="teamLeader"
                        className={
                          formik.errors.teamLeader
                            ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }
                      >
                        <option defaultValue>Choose one</option>
                        {players
                          .filter(
                            (player) => !player.teamLeader && !player.team
                          )
                          .map((player, index) => {
                            return (
                              <Fragment key={index}>
                                <option value={player._id}>
                                  {player.name} {player.lastname}
                                </option>
                              </Fragment>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex gap-4">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.instagram}
                    type="text"
                    name="instagram"
                    className={inputNormal}
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Instagram
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.facebook}
                    type="text"
                    name="facebook"
                    className={inputNormal}
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Facebook
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.twitter}
                    type="text"
                    name="twitter"
                    className={inputNormal}
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Twitter
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {team ? "Edit info" : "Create team"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setchangeImage(true)}
              type="button"
              className="flex items-center transition-all duration-300 w-sm text-white hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center mr-2 dark:border-blue-500 dark:text-white dark:hover:text-white bg-blue-500"
            >
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Go back
            </button>
            <ImageForm team={team._id} setReloadTeams={setReloadTeams} setShowModal={setShowModal} />
          </div>
        )}
      </form>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

function initialValues(team) {
  if (team) {
    return {
      name: team?.name || "",
      instagram: team?.social?.instagram || "",
      facebook: team?.social?.facebook || "",
      twitter: team?.social?.twitter || "",
    };
  }
  return {
    name: "",
    teamLeader: "",
    instagram: "",
    facebook: "",
    twitter: "",
  };
}

function validationSchema(team) {
  if (team) {
    return {
      name: Yup.string().required(),
    };
  }
  return {
    name: Yup.string().required(),
    teamLeader: Yup.string().required("Please, select a team leader."),
  };
}
