import React, { useState } from 'react';
import moment from 'moment/moment';
import ReactPaginate from 'react-paginate';
import ListPlayers from '../ListPlayers/ListPlayers';
import BasicModal from '@/components/Modal/BasicModal';

export default function TableTeams(props) {

    const { teams } = props;

    const [showModal, setShowModal] = useState(false);
    const [teamPlayers, setTeamPlayers] = useState([])
    const [itemOffset, setItemOffset] = useState(0);
    const [search, setSearch] = useState('');
    const [newSearch, setNewSearch] = useState();
    const tableTeams = teams;

    const itemsPerPage = 8;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = search ? newSearch : teams.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(teams.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % teams.length;
        setItemOffset(newOffset);
    };

    const handleClick = (players) => {
        setTeamPlayers(players);
        setShowModal(true)
    }

    const handleChange = e => {
        setSearch(e.target.value);
        filter(e.target.value)
    }

    const filter = (searchTerm) => {
        let resultSearch = tableTeams.filter((element) => {
            if (element.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
            ) {
                return element;
            }
        });
        setNewSearch(resultSearch);
    }


    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between p-5 pb-4 bg-white dark:bg-gray-900">
                    <h1 className='text-3xl font-semibold whitespace-nowrap text-white'>Registered Players</h1>
                    <label className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" value={search} onChange={handleChange} className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Owner
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Players
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Since
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Score
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((team, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={team.image} alt={index} />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{team.name}</div>
                                        <div className="font-normal text-gray-500">owner: {team.teamLeader[0].name}</div>
                                    </div>
                                </th>

                                <td className="px-6 py-4">
                                    {team.teamLeader[0].name} {team.teamLeader[0].lastname}
                                </td>
                                <td className="flex -space-x-4 px-6 py-4">
                                    {
                                        (team.players.map((img, i) => (
                                            <div key={i}>
                                                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={img.image} alt={i} />
                                            </div>
                                        ))
                                        )
                                    }
                                    <div onClick={() => handleClick(team.players)} className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 cursor-pointer">+</div>
                                </td>
                                <td className="px-6 py-4">
                                    {moment(team.dateCreated).format('YYYY')}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                        <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                                        {team.win}
                                    </span>
                                    <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                        <span className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                                        {team.tie}
                                    </span>
                                    <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                        <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                                        {team.lose}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                                        <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                        <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                            <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                                        </svg>
                                    </button>                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                {search ? null :
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        containerClassName={"flex justify-center items-center -space-x-px h-8 text-sm mt-4"}
                        nextLinkClassName={"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                        previousLinkClassName={"flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                        activeClassName={"flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"}
                        pageClassName={"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                    />
                }
                <BasicModal
                    show={showModal}
                    setShow={setShowModal}
                    title={'Team players'}
                >
                    <ListPlayers teamPlayers={teamPlayers} />
                </BasicModal>
            </div>
        </>
    )
}
