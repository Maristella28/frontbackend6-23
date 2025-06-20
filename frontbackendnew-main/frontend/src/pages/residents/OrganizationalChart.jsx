import React from 'react';
import Navbares from "../../components/Navbares";
import Sidebares from "../../components/Sidebares";

const OrganizationalChart = () => {
  return (
    <>
      <Navbares />
      <Sidebares />

      <main className="ml-64 pt-20 p-8 bg-white min-h-screen font-sans">
        <h1 className="text-2xl font-bold text-gray-900 mb-10">Organizational Chart</h1>

        {/* Top Leader */}
        <div className="flex justify-center mb-6">
          <div className="w-40 h-20 bg-green-200 rounded-md flex items-center justify-center border border-green-300">
            <span className="text-2xl">👤</span>
          </div>
        </div>

        {/* Level 2 - Three Sub-Leaders */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="w-40 h-20 bg-green-200 rounded-md flex items-center justify-center border border-blue-500">
            <span className="text-2xl">👤</span>
          </div>
          <div className="w-40 h-20 bg-green-200 rounded-md flex items-center justify-center border border-green-300">
            <span className="text-2xl">👤</span>
          </div>
          <div className="w-40 h-20 bg-green-200 rounded-md flex items-center justify-center border border-green-300">
            <span className="text-2xl">👤</span>
          </div>
        </div>

        {/* Bottom Grid: 3 columns x 4 rows */}
        <div className="grid grid-cols-3 gap-6 justify-items-center">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="w-40 h-20 bg-green-200 rounded-md flex items-center justify-center border border-green-300"
            >
              <span className="text-2xl">👤</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default OrganizationalChart;