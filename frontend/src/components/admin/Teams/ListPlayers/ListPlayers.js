import React from "react";
import moment from "moment";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Image from "next/image";
import { removePlayerTeamApi } from "@/api/teams";
import NoImageProfile from "../../../../../public/png/no-profile.png";

export default function ListPlayers(props) {
  const { teamPlayers, teamLeader, setReloadTeams } = props;
  const { user } = useAuth();

  const removePlayerTeam = async (playerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this player of team?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete player!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const userId = user.id;
        const response = await removePlayerTeamApi(playerId, userId);
        if (response.status === 200) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
        setReloadTeams(true);
        setShowModal(false);
      }
    });
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Player name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Document
            </th>
            <th scope="col" className="px-6 py-3">
              Years
            </th>
            {user.id === teamLeader ? (
              <th scope="col" className="px-6 py-3">
                Remove
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {teamPlayers.map((player, index) => (
            <tr key={index} className="border-gray-700 border-b">
              <th
                scope="row"
                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
              >
                <Image
                  className="w-10 h-10 rounded-lg mr-4"
                  src={player?.image || NoImageProfile.src}
                  alt={index}
                />
                {player.name} {player.lastname}
              </th>
              <td className="px-6 py-4">{player.position}</td>
              <td className="px-6 py-4">{player.document}</td>
              <td className="px-6 py-4">
                {moment().diff(player.birthday, "years")} Years
              </td>
              {user.id === teamLeader ? (
                <td className="px-6 py-4">
                  <button onClick={() => removePlayerTeam(player._id)}>
                    <svg
                      className="w-4 h-4 text-gray-800 dark:text-red-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 8h6m-9-3.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                      />
                    </svg>
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

{
  /* <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {teamPlayers.map((player, index) => (
                <ul key={index}>
                    <li className="pb-3 sm:pb-4 mt-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <Image className="w-8 h-8 rounded" src={player.image} alt={player.namae} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {player.name} {player.lastname}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {player.position}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                                {moment().diff(player.birthday, 'years')} Years
                            </div>
                        </div>
                    </li>
                </ul>
            ))}
        </div> */
}
