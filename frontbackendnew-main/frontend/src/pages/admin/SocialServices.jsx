import React from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const SocialServices = () => {
  const residents = [
    {}
  ];

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Social Services</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-lime-500">
            <div className="text-2xl font-bold text-gray-700">1,245</div>
            <div className="text-sm text-gray-500 mt-1">Total of Beneficiaries</div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-purple-500">
            <div className="text-2xl font-bold text-gray-700">58</div>
            <div className="text-sm text-gray-500 mt-1">Student Beneficiaries</div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-gray-700">16</div>
            <div className="text-sm text-gray-500 mt-1">Senior Citizen Beneficiaries</div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-amber-500">
            <div className="text-2xl font-bold text-gray-700">12</div>
            <div className="text-sm text-gray-500 mt-1">PWD Beneficiaries</div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-rose-500">
            <div className="text-2xl font-bold text-gray-700">8</div>
            <div className="text-sm text-gray-500 mt-1">Beneficiaries</div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-teal-500">
            <div className="text-2xl font-bold text-gray-700">3</div>
            <div className="text-sm text-gray-500 mt-1">Beneficiaries</div>
          </div>
        </div>

        <div className="shadow-lg border rounded-lg mt-6 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">List of Social Services / Assistance</h2>
            <div className="flex items-center gap-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Residents Application
              </button>
            </div>
          </div>

          <table className="min-w-full text-sm text-left">
            <thead className="bg-lime-300 text-black text-xs uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold text-center">List of Beneficiaries</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-lime-100">
              {residents.map((resident, index) => (
                <tr key={index}>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default SocialServices;