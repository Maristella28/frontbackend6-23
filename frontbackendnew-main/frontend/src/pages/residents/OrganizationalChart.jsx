import React from 'react';
import Navbares from "../../components/Navbares";
import Sidebares from "../../components/Sidebares";

const OrganizationalChart = () => {
  return (
    <>
      <Navbares />
      <Sidebares />

      <main className="ml-64 pt-20 p-8 bg-white min-h-screen font-sans">
        <h1 className="text-2xl font-bold text-gray-900 mb-10 text-center">
          Barangay Organizational Chart
        </h1>

        {/* Barangay Captain */}
        <div className="flex flex-col items-center mb-10">
          <div className="text-lg font-semibold mb-2">Barangay Captain</div>
          <div className="w-48 h-20 bg-green-300 rounded-md flex items-center justify-center shadow-md">
            <span className="text-2xl">👤</span>
          </div>
        </div>

        {/* Kagawads */}
        <div className="mb-10">
          <div className="text-lg font-semibold text-center mb-2">Barangay Councilors (Kagawads)</div>
          <div className="grid grid-cols-4 gap-4 justify-items-center">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="w-40 h-20 bg-green-200 rounded-md flex items-center justify-center shadow border"
              >
                <span className="text-2xl">👤</span>
              </div>
            ))}
          </div>
        </div>

        {/* Secretary and Treasurer */}
        <div className="flex justify-center gap-8 mb-10">
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium mb-1">Secretary</div>
            <div className="w-36 h-16 bg-green-100 rounded-md flex items-center justify-center border">
              <span className="text-2xl">👤</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium mb-1">Treasurer</div>
            <div className="w-36 h-16 bg-green-100 rounded-md flex items-center justify-center border">
              <span className="text-2xl">👤</span>
            </div>
          </div>
        </div>

        {/* SK Chairman */}
        <div className="flex flex-col items-center mb-10">
          <div className="text-sm font-medium mb-1">SK Chairman</div>
          <div className="w-40 h-16 bg-green-100 rounded-md flex items-center justify-center border">
            <span className="text-2xl">👤</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrganizationalChart;