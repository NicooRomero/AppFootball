import React, { useState, useEffect } from "react";
import BasicModal from "@/components/Modal/BasicModal";
import { getApiTeams } from "@/api/teams";
import NewTournament from "../../Forms/newTournament/NewTournament";

export default function InfoTournament(props) {

    const { setShowFixture, isAdmin, tournament } = props;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [teams, setTeams] = useState([])

  useEffect(() => {
    (async () => {
      const dataTeam = await getApiTeams();
      setTeams(dataTeam);
    })();
  },[])

  return (
    <div className="w-64">
      <div className="w-full max-w-sm rounded-lg shadow bg-[#19212c]">
        <div className="bg-gray-800 rounded-t-lg text-xs uppercase">
          <p className="tracking-wider text-gray-400 font-semibold text-center px-6 py-3">
            2020-21 Season
          </p>
        </div>
        {tournament.length > 0 ?
        <div className="flex justify-end px-4 pt-4">
          {isAdmin ?
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
            onClick={() => setShowDropdown(true)}
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          : null }

          <div
            id="dropdown"
            className={`z-10 absolute ${showDropdown ? null : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  New Fixture
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Reset Fixture
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete Fixture
                </a>
              </li>
            </ul>
          </div>

        </div>
        : null }
       {tournament.length > 0 ?
       <div className="flex flex-col justify-center items-center pb-10">
       <img
         className="w-24 h-24 mb-3 rounded-full shadow-lg"
         src="https://static.vecteezy.com/system/resources/previews/010/994/451/non_2x/premier-league-logo-symbol-with-name-design-england-football-european-countries-football-teams-illustration-with-purple-background-free-vector.jpg"
         alt="Bonnie image"
       />
       <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
         ⭐ Premier League ⭐
       </h5>
       <span className="text-sm text-gray-500 dark:text-gray-400">
         Championship 🏆
       </span>
       <span className="text-sm text-gray-500 dark:text-gray-400">
         Total players: 25
       </span>
       <span className="text-sm text-gray-500 dark:text-gray-400">
         Total teams: 18
       </span>
       <div className="flex mt-4 gap-2 md:mt-6">
         <button
           onClick={() => setShowFixture(false)}
           className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 "
         >
           Positions
         </button>
         <button
           onClick={() => setShowFixture(true)}
           className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 "
         >
           Fixture
         </button>
       </div>
     </div>
        :
        <div className="flex justify-center px-4 py-4 items-center">
        <button onClick={() => setShowModal(true)} type="button" className="text-white items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create new Tournament</button>
        </div>
      }
      </div>
      
      <div className="w-full max-w-sm rounded-lg mt-2 shadow bg-[#19212c]">
        <div className="bg-gray-800 rounded-t-lg text-xs uppercase">
          <p className="tracking-wider text-gray-400 font-semibold text-center px-6 py-3">
            Last Champion
          </p>
        </div>
        <div className="flex flex-col justify-center items-center mt-4 pb-4">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/072016/untitled-2_0.png?itok=0f43Nsyh"
            alt="Bonnie image"
          />
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Manchester City 🏆
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            2021 ⭐
          </span>
        </div>
      </div>
      <BasicModal
            show={showModal}
            setShow={setShowModal}
            title='Create new tournament'
        >
            <NewTournament teams={teams} />
        </BasicModal>
    </div>
  );
}
