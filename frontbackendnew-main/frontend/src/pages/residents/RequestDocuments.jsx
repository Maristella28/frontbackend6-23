import React from 'react';
import Navbares from "../../components/Navbares";
import Sidebares from "../../components/Sidebares";
import { FaFileAlt, FaBusinessTime, FaIdBadge } from 'react-icons/fa';

const RequestDocuments = () => {
  return (
    <>
      <Navbares />
      <div className="flex min-h-screen">
        <Sidebares />

        {/* Shift content further right with ml-32 */}
        <div className="flex-1 flex items-center justify-center bg-white ml-32">
          <div className="w-full max-w-5xl p-8">
            {/* Document Cards */}
            <div className="flex justify-center gap-8 mb-16">
              <div className="bg-green-100 rounded-md p-6 shadow-md text-center hover:shadow-lg cursor-pointer w-64">
                <FaFileAlt className="text-green-700 text-4xl mx-auto mb-4" />
                <p className="font-semibold">Barangay Clearance</p>
              </div>

              <div className="bg-blue-100 rounded-md p-6 shadow-md text-center hover:shadow-lg cursor-pointer w-64">
                <FaBusinessTime className="text-blue-700 text-4xl mx-auto mb-4" />
                <p className="font-semibold">Barangay Business Clearance</p>
              </div>

              <div className="bg-purple-100 rounded-md p-6 shadow-md text-center hover:shadow-lg cursor-pointer w-64">
                <FaIdBadge className="text-purple-700 text-4xl mx-auto mb-4" />
                <p className="font-semibold">Community Tax Certificate (Cedula)</p>
              </div>
            </div>

            {/* Dropdown */}
            <div className="w-1/3 mx-auto">
              <select className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option disabled selected>Other Types Of Document</option>
                <option>Certificate of Indigency</option>
                <option>Certificate of Residency</option>
                <option>Barangay ID</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestDocuments;