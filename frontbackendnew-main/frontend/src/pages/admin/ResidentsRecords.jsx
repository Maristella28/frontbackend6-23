import React from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const residents = [
  {
    residentID: 'RES-001',
    fullname: 'Jerry The Mouse',
    nationalID: '000-1111-222-33',
    age: 23,
    civilStatus: 'Single',
    gender: 'Male',
    voterStatus: 'Yes',
  },
  {
    residentID: 'RES-002',
    fullname: 'Jerry The Mouse',
    nationalID: '000-1111-222-33',
    age: 23,
    civilStatus: 'Single',
    gender: 'Male',
    voterStatus: 'Yes',
  },
  {
    residentID: 'RES-003',
    fullname: 'Jerry The Mouse',
    nationalID: '000-1111-222-33',
    age: 23,
    civilStatus: 'Single',
    gender: 'Male',
    voterStatus: 'Yes',
  },
  {
    residentID: 'RES-004',
    fullname: 'Jerry The Mouse',
    nationalID: '000-1111-222-33',
    age: 23,
    civilStatus: 'Single',
    gender: 'Male',
    voterStatus: 'Yes',
  },
];

const ResidentsRecords = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Residents Records</h1>
        <div className="shadow-lg border rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Resident Records</h2>
            <div className="flex items-center gap-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                + Add Resident
              </button>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 border rounded focus:outline-none"
                />
                <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Search</button>
              </div>
            </div>
          </div>

          <table className="min-w-full text-sm text-left">
            <thead className="bg-lime-300 text-black text-xs uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">Resident ID</th>
                <th className="px-4 py-3 font-semibold">Fullname</th>
                <th className="px-4 py-3 font-semibold">National ID</th>
                <th className="px-4 py-3 font-semibold">Age</th>
                <th className="px-4 py-3 font-semibold">Civil Status</th>
                <th className="px-4 py-3 font-semibold">Gender</th>
                <th className="px-4 py-3 font-semibold">Voter Status</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-lime-100">
              {residents.map((resident, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 font-medium">{resident.residentID}</td>
                  <td className="px-4 py-3">{resident.fullname}</td>
                  <td className="px-4 py-3">{resident.nationalID}</td>
                  <td className="px-4 py-3">{resident.age}</td>
                  <td className="px-4 py-3">{resident.civilStatus}</td>
                  <td className="px-4 py-3">{resident.gender}</td>
                  <td className="px-4 py-3">{resident.voterStatus}</td>
                  <td className="px-4 py-3">
                    <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 text-sm">Action ▼</button>
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

export default ResidentsRecords;