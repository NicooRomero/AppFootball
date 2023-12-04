import React, { useState, useEffect } from "react";
import { getApiFixture, getApiGame } from "@/api/tournament";
import ReactPaginate from "react-paginate";
import MatchForm from "../../Forms/matchForm/MatchForm";
import BasicModal from "@/components/Modal/BasicModal";
import Image from "next/image";

export default function Fixture(props) {
  const { tournamentId, isAdmin, reload, setReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [fixture, setFixture] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [matchDay, setMatchDay] = useState(1);
  const [component, setComponent] = useState();

  useEffect(() => {
    (async () => {
      const data = await getApiFixture(tournamentId);
      setFixture(data);
      setReload(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const itemsPerPage = 1;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = fixture.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(fixture.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % fixture.length;
    setMatchDay(event.selected + 1);
    setItemOffset(newOffset);
  };

  const editMatch = async (gameId) => {
    const game = await getApiGame(tournamentId, gameId);

    if (game) {
      setComponent(
        <MatchForm
          tournamentId={tournamentId}
          game={game}
          setReload={setReload}
          setShowModal={setShowModal}
        />
      );
      setShowModal(true);
    }
  };

  if (fixture.length > 0) {
    return (
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full text-sm text-gray-400">
              <thead className="bg-gray-800 text-xs uppercase rounded-lg font-medium">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Home Team
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Away Team
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Kick Off
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Day
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Stadium
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800">
                {currentItems.map((matchs, indexRound) => (
                  <React.Fragment key={indexRound}>
                    <tr className="bg-gray-800 bg-opacity-20">
                      <td className="px-6 py-4 whitespace-nowrap" colSpan="6">
                        <span className="ml-2 font-medium">
                          ⚽ Match Day {matchDay}
                        </span>
                      </td>
                    </tr>
                    {matchs.matches.map((round, indexMatch) => {
                      return (
                        <tr
                          key={indexMatch}
                          onClick={() =>
                            isAdmin ? editMatch(round._id) : null
                          }
                          className="bg-black bg-opacity-20 hover:bg-gray-700"
                        >
                          <td className="flex justify-between gap-4 items-center px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Image
                                className="w-10 h-10 mr-2 rounded-full"
                                src={round.home.image}
                                alt={round.home.name}
                              />
                              <span>{round.home.name}</span>
                            </div>
                            <input
                              disabled
                              type="number"
                              value={round.goalsH}
                              id="goalsH"
                              name="goalsH"
                              className="bg-gray-50 w-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">vs</td>
                          <td className="flex justify-between gap-4 items-center px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Image
                                className="w-10 h-10 rounded-full overflow-hidden"
                                src={round.away.image}
                                alt={round.away.name}
                              />
                              <span className="ml-2">{round.away.name}</span>
                            </div>
                            <input
                              disabled
                              type="number"
                              value={round.goalsA}
                              id="goalsH"
                              name="goalsH"
                              className="bg-gray-50 w-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {round.kickoff}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {round.day}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {round.stadium}
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={20}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName={
            "flex justify-center items-center -space-x-px h-8 text-sm mt-4"
          }
          nextLinkClassName={
            "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          }
          previousLinkClassName={
            "flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          }
          activeClassName={
            "flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          }
          pageClassName={
            "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          }
        />
        <BasicModal
          show={showModal}
          setShow={setShowModal}
          title="Edit match day"
        >
          {component}
        </BasicModal>
      </div>
    );
  } else {
    return (
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full text-sm text-gray-400">
              <thead className="bg-gray-800 text-xs uppercase rounded-lg font-medium">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Home Team
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Away Team
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Kick Off
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Day
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Stadium
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="flex flex-col items-center mt-3 mb-3 me-4 md:items-center md:flex-row md:mb-0">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600"
            >
              <Image
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-6 me-2"
                alt="Flowbite Logo"
              />
              <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
                Tournament
              </span>
            </a>
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              The fixture draw has not been done yet.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
