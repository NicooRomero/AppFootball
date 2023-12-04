import React from "react";
import Image from "next/image";

export default function TablePositions(props) {

  const { teams } = props; 
  
  if(teams && teams.length > 0) {

    const sortedTeams = [...teams].sort((a, b) => b.points - a.points)
  
    return (
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full text-sm text-gray-400">
              <thead className="bg-gray-800 text-xs uppercase font-medium">
                <tr>
                  <th></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Club
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    MP
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    W
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    D
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    L
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    GF
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    GA
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    GD
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Pts
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Last 5
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800">
                {sortedTeams.map((team, index) => {
                  return (
                    <tr key={index} className="bg-black bg-opacity-20">
                      <td className="pl-4">{index + 1}</td>
                      <td className="flex px-6 py-4 whitespace-nowrap">
                        <Image className="w-5" src={team.image} alt="" />
                        <span className="ml-2 font-medium">{team.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.matches}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.win}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.tie}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.lose}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.goalsF}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.goalsA}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.goalsF - team.goalsA}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.win * 3 + team.tie * 1}
                      </td>
                      <td className="flex pr-4 py-4 whitespace-nowrap">
                        {team.lastMatches.map((last, i) => (
                          <div key={i}>
                              <svg
                              className={
                                  last === 1
                                  ? "w-4 fill-current text-green-600"
                                  : last === 0
                                  ? "w-4 fill-current text-gray-400"
                                  : "w-4 fill-current text-red-600"
                              }
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              >
                              {last === 1 ? (
                                  <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                  />
                              ) : last === 0 ? (
                                  <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                  clipRule="evenodd"
                                  />
                              ) : (
                                  <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                  />
                              )}
                              </svg>
                          </div>
                        ))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full text-sm text-gray-400">
            <thead className="bg-gray-800 text-xs uppercase font-medium">
              <tr>
                <th></th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left tracking-wider"
                >
                  Club
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left tracking-wider"
                >
                  MP
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left tracking-wider"
                >
                  W
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left tracking-wider"
                >
                  D
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left tracking-wider"
                >
                  L
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left tracking-wider"
                >
                  GF
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left tracking-wider"
                >
                  GA
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left tracking-wider"
                >
                  GD
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left tracking-wider"
                >
                  Pts
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left tracking-wider"
                >
                  Last 5
                </th>
              </tr>
            </thead>
            </table>
          </div>
        </div>
      </div>
      )
  }
}
