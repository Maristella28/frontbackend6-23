import React from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const records = [
  {
    householdId: 'HH-001', // Added Household ID
    name: 'Jerry The Mouse',
    id: '000-1111-222-33',
    age: 23,
    status: 'Single',
    gender: 'Male',
    doc: 'Brgy Clearance',
  },
  {
    householdId: 'HH-002',
    name: 'Jerry The Mouse',
    id: '000-1111-222-33',
    age: 23,
    status: 'Single',
    gender: 'Male',
    doc: 'Brgy Clearance',
  },
  {
    householdId: 'HH-003',
    name: 'Jerry The Mouse',
    id: '000-1111-222-33',
    age: 23,
    status: 'Single',
    gender: 'Male',
    doc: 'Cedula',
  },
  {
    householdId: 'HH-004',
    name: 'Jerry The Mouse',
    id: '000-1111-222-33',
    age: 23,
    status: 'Single',
    gender: 'Male',
    doc: 'Cedula',
  },
];

const HouseholdRecords = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Household</h1>

        {/* Table */}
        <div className="shadow-lg border rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Household Records</h2>
            <div className="flex items-center gap-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                + Add Member
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
                <th className="px-4 py-3 font-semibold">Household ID</th> {/* Added column */}
                <th className="px-4 py-3 font-semibold">Fullname</th>
                <th className="px-4 py-3 font-semibold">National ID</th>
                <th className="px-4 py-3 font-semibold">Age</th>
                <th className="px-4 py-3 font-semibold">Civil Status</th>
                <th className="px-4 py-3 font-semibold">Gender</th>
                <th className="px-4 py-3 font-semibold">Type of Document</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-lime-100">
              {records.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 font-medium">{item.householdId}</td> {/* Display Household ID */}
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.age}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">{item.gender}</td>
                  <td className="px-4 py-3">{item.doc}</td>
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

export default HouseholdRecords;