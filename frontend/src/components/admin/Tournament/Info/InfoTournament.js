import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Swal from "sweetalert2";
import { getApiTeams } from "@/api/teams";
import { setNewFixture, apiTeamsValuesReset, apiDeleteFixture, apiDeleteTournament } from "@/api/tournament";
import BasicModal from "@/components/Modal/BasicModal";
import Image from "next/image";
import NewTournament from "../../Forms/newTournament/NewTournament";

export default function InfoTournament(props) {

  const { setShowFixture, isAdmin, tournament, setReload } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    (async () => {
      const dataTeam = await getApiTeams();
      setTeams(dataTeam);
    })();
  },[])

  const addNewFixture = async (tournamentID) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to create new fixture?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, create please!'
    }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await setNewFixture(tournamentID)
                if (response.status === 200) {
                    toast.success(response.data.message);
                    setReload(true)
                } else {
                    toast.error(response.response.data.message);
                }          
        }
    }); 
  }

  const resetTeamsValues = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to reset team values?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset please!'
    }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await apiTeamsValuesReset()
                if (response.status === 200) {
                  toast.success(response.data.message);
                  setReload(true)
                } else {
                    toast.error(response.response.data.message);
                }          
        }
    });     
  }

  const deleteFixture = (tournamentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete tournament fixture?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete please!'
    }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await apiDeleteFixture(tournamentId)
            if (response.status === 200) {
              toast.success(response.data.message);
              setReload(true)
            } else {
                toast.error(response.response.data.message);
            }         
        }
    }); 
  }

  const deleteTournament = (tournamentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete tournament?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete please!'
    }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await apiDeleteTournament(tournamentId)
          console.log(response);
            if (response.status === 200) {
              toast.success(response.data.message);
              setReload(true)
            } else {
              console.log(response);
                toast.error(response.response.data.message);
            }         
        }
    }); 
  }
      return (
        <div className="w-64">
          <div className="w-full max-w-sm rounded-lg shadow bg-[#19212c]">
            <div className="bg-gray-800 rounded-t-lg text-xs uppercase">
              <p className="tracking-wider text-gray-400 font-semibold text-center px-6 py-3">
              {tournament[0]?.season || null}
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
                    <p
                      onClick={() => addNewFixture(tournament[0]._id)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      New Fixture
                    </p>
                  </li>
                  <li>
                    <p
                      onClick={() => resetTeamsValues()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Reset Teams Values
                    </p>
                  </li>
                  <li>
                    <p
                      onClick={() => deleteFixture(tournament[0]._id)}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete Fixture
                    </p>
                  </li>
                  <li>
                    <p
                      onClick={() => deleteTournament(tournament[0]._id)}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete Tournament
                    </p>
                  </li>
                </ul>
              </div>

            </div>
            : null }
          {tournament.length > 0 ?
          <div className="flex flex-col justify-center items-center pb-10">
          <Image
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={tournament[0].image}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            ⭐ {tournament[0].name} ⭐
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Championship 🏆
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total teams: {tournament[0].teams.length}
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
          {tournament.length > 0 ?
          <div className="w-full max-w-sm rounded-lg mt-2 shadow bg-[#19212c]">
            <div className="bg-gray-800 rounded-t-lg text-xs uppercase">
              <p className="tracking-wider text-gray-400 font-semibold text-center px-6 py-3">
                Last Champion
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mt-4 pb-4">
              <Image
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={tournament[0]?.lastChampion.image}
                alt={tournament[0]?.lastChampion.name}
              />
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                {tournament[0]?.lastChampion.name} 🏆
              </h5>
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                {tournament[0]?.lastChampion.championships.map((champions, i) => {
                  return (
                    <div key={i} className="flex">
                      <p className="mr-1">{champions}</p> <span className="mr-2">⭐</span>
                    </div>
                  )
                }).reverse()}                
              </span>
            </div>
          </div>
          : null }
          <BasicModal
                show={showModal}
                setShow={setShowModal}
                title='Create new tournament'
            >
                <NewTournament teams={teams} setReload={setReload} setShowModal={setShowModal} />
            </BasicModal>
        </div>
      );
}
