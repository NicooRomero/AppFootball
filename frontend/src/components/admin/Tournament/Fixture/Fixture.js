import React, { useState } from "react";
import MatchForm from "../../Forms/matchForm/MatchForm";
import BasicModal from "@/components/Modal/BasicModal";

export default function Fixture() {

    const [showModal, setShowModal] = useState(false);
    let YES = true;
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
         <div className="shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full text-sm text-gray-400">
            <thead className="bg-gray-800 text-xs uppercase rounded-lg font-medium">
              <tr>
                <th></th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                    Matchweek
                </th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                  Home Team
                </th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                  
                </th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                  Away Team
                </th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                Kick Off
                </th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                Day
                </th>
                <th scope="col" className="px-6 py-3 text-left tracking-wider">
                    Stadium
                </th>
              </tr>
            </thead>
            <tbody onClick={() => YES ? setShowModal(true) : null} className="bg-gray-800 hover:bg-gray-700">
              <tr className="bg-black bg-opacity-20">
                <td className="pl-4">1</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="ml-2 font-medium">Match 1</span>
                </td>
                <td className="flex items-center px-6 py-4 whitespace-nowrap">
                    <img className="w-10 h-10 mr-2 rounded-full" src='http://localhost:4000/public/uploads/teams/65612399222677bc5984d1ca/chelsea-logo-1700864929237.png' alt="Rounded avatar" />
                    <span>Chelsea</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">vs</td>
                <td className="flex items-center px-6 py-4 whitespace-nowrap">
                    <img className="w-10 h-10 rounded-full overflow-hidden"  src='http://localhost:4000/public/uploads/teams/656124f0222677bc5984d29d/liverpool-1700865277108.png' alt="" />
                    <span className="ml-2">Liverpool</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">14:00</td>
                <td className="px-6 py-4 whitespace-nowrap">Saturday</td>
                <td className="px-6 py-4 whitespace-nowrap">3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        <BasicModal
            show={showModal}
            setShow={setShowModal}
            title='Edit match day'
        >
            <MatchForm />
        </BasicModal>
    </div>
  );
}
