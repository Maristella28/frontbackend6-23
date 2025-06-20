import React from 'react';
import Navbares from "../../components/Navbares";
import Sidebares from "../../components/Sidebares";

const BlotterAppointment = () => {
  return (
    <>
      <Navbares />
      <Sidebares />
      <main className="ml-64 pt-20 p-8 bg-white min-h-screen font-sans">
        <h1 className="text-2xl font-bold text-gray-900 mb-10">Blotter Report</h1>

        <div className="flex flex-wrap justify-center gap-10">
          <button className="bg-yellow-200 hover:bg-yellow-300 text-black px-6 py-8 rounded-lg shadow-lg text-center w-60 transition-all duration-200">
            <div className="text-4xl mb-2">⚠️</div>
            <div className="font-semibold">Show List of Charter</div>
          </button>

          <button className="bg-red-200 hover:bg-red-300 text-black px-6 py-8 rounded-lg shadow-lg text-center w-60 transition-all duration-200">
            <div className="text-4xl mb-2">📝</div>
            <div className="font-semibold">Generate Blotter Appointment</div>
          </button>
        </div>
      </main>
    </>
  );
};

export default BlotterAppointment;