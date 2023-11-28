import React from 'react'

export default function MatchForm() {
  return (
    <div>
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
                    <img className="w-10 h-10 mr-2 rounded-full" src='http://localhost:4000/public/uploads/teams/65612399222677bc5984d1ca/chelsea-logo-1700864929237.png' alt="Rounded avatar" />
                    <span>Chelsea</span>
                </td>
                <td className="items-center px-6 py-4 whitespace-nowrap">
                    <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
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
                    <img className="w-10 h-10 mr-2 rounded-full" src='http://localhost:4000/public/uploads/teams/656124f0222677bc5984d29d/liverpool-1700865277108.png' alt="Rounded avatar" />
                    <span>Liverpool</span>
                </td>
                <td className="items-center px-6 py-4 whitespace-nowrap">
                    <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
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
                    <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="14:00" required />
                </td>
                <td className="items-center px-6 py-4 whitespace-nowrap">
                    <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Saturday" required />
                </td>
                <td className="items-center px-6 py-4 whitespace-nowrap">
                <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="3" required />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type="button" className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit match</button>
        </div>
  )
}
