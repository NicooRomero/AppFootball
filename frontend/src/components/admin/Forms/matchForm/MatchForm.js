import React from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { editApiGame } from "@/api/tournament";
import Image from "next/image";

export default function MatchForm(props) {
  const { game, tournamentId, setReload, setShowModal } = props;

  const formik = useFormik({
    initialValues: initialValues(game),
    onSubmit: async (formData) => {
      const result = await editApiGame(tournamentId, game._id, formData);
      if (result.status === 200) {
        toast.success(result.data.message);
        setReload(true);
        setShowModal(false);
      } else {
        toast.error("An error occurred while trying to create tournament.");
      }
    },
  });

  if (!game) {
    return (
      <div className="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="shadow sm:rounded-lg">
          <table className="min-w-full text-sm text-gray-400">
            <thead className="bg-gray-800 text-xs uppercase font-medium">
              <tr>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                  Matchweek
                </th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                  Home Team
                </th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                  Goals
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 hover:bg-gray-700">
              <tr className="bg-black bg-opacity-20">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="ml-2 font-medium">Match 1</span>
                </td>
                <td className="flex items-center px-6 py-4 whitespace-nowrap">
                  <Image
                    className="w-10 h-10 mr-2 rounded-full"
                    src={game.home.image}
                    alt={game.home.name}
                  />
                  <span>{game.home.name}</span>
                </td>
                <td className="items-center px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    id="newGoalsH"
                    name="newGoalsH"
                    onChange={formik.handleChange}
                    className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={game.goalsH}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-full text-sm text-gray-400">
            <thead className="bg-gray-800 text-xs uppercase font-medium">
              <tr>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                  Matchweek
                </th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                  Away Team
                </th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                  Goals
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 hover:bg-gray-700">
              <tr className="bg-black bg-opacity-20">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="ml-2 font-medium">Match 1</span>
                </td>
                <td className="flex items-center px-6 py-4 whitespace-nowrap">
                  <Image
                    className="w-10 h-10 mr-2 rounded-full"
                    src={game.away.image}
                    alt={game.away.name}
                  />
                  <span>{game.away.name}</span>
                </td>
                <td className="items-center px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    id="newGoalsA"
                    name="newGoalsA"
                    onChange={formik.handleChange}
                    className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={game.goalsA}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-full text-sm text-gray-400">
            <thead className="bg-gray-800 text-xs uppercase font-medium">
              <tr>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                  Kick off
                </th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                  Day
                </th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                  Stadium
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 hover:bg-gray-700">
              <tr className="bg-black bg-opacity-20">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="newKickoff"
                    id="newKickoff"
                    value={formik.values.newKickoff}
                    onChange={formik.handleChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder={game.kickoff}
                  />
                </td>
                <td className="items-center px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="newDay"
                    id="newDay"
                    value={formik.values.newDay}
                    onChange={formik.handleChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder={game.day}
                  />
                </td>
                <td className="items-center px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="newStadium"
                    id="newStadium"
                    value={formik.values.newStadium}
                    onChange={formik.handleChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder={game.stadium}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          type="submit"
          className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Edit match
        </button>
      </form>
    );
  }
}

function initialValues(game) {
  if (game) {
    return {
      newKickoff: game?.kickoff,
      newStadium: game?.stadium,
      newDay: game?.day
    }
  }
}
