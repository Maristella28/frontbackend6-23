import React from 'react';
import Navbares from "../../components/Navbares";
import Sidebares from "../../components/Sidebares";

const assetRecords = [
  { asset: 'Laptop', date: '2025-06-01', status: 'Pending' },
  { asset: 'Printer', date: '2025-06-02', status: 'Approved' },
  { asset: 'Projector', date: '2025-06-03', status: 'Denied' },
  { asset: 'Camera', date: '2025-06-04', status: 'Pending' },
  { asset: 'Microphone', date: '2025-06-05', status: 'Approved' },
];

const RequestAssets = () => {
  return (
    <>
      <Navbares />
      <Sidebares />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Request Assets</h1>
          <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold py-2 px-6 rounded border border-black">
            Request a Assets
          </button>
        </div>

        <div className="shadow-lg border rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">All Available Assets</h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-2 border rounded focus:outline-none"
              />
              <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Search</button>
            </div>
          </div>

          <table className="min-w-full text-sm text-left">
            <thead className="bg-lime-300 text-black text-xs uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">Assets</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-lime-100">
              {assetRecords.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{item.asset}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">
                    <button className="bg-white border border-gray-400 px-3 py-1 rounded hover:bg-gray-100 text-sm">
                      Action ▼
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default RequestAssets;