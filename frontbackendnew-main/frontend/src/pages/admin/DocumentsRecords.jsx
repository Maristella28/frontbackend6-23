import React from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const records = [
  {
    residentId: 'RES-001', // Added Resident ID
    name: 'Jerry The Mouse',
    id: '000-1111-222-33',
    age: 23,
    status: 'Single',
    gender: 'Male',
    doc: 'Brgy Clearance',
  },
  {
    residentId: 'RES-002',
    name: 'Jerry The Mouse',
    id: '000-1111-222-33',
    age: 23,
    status: 'Single',
    gender: 'Male',
    doc: 'Brgy Clearance',
  },
  {
    residentId: 'RES-003',
    name: 'Jerry The Mouse',
    id: '000-1111-222-33',
    age: 23,
    status: 'Single',
    gender: 'Male',
    doc: 'Cedula',
  },
  {
    residentId: 'RES-004',
    name: 'Jerry The Mouse',
    id: '000-1111-222-33',
    age: 23,
    status: 'Single',
    gender: 'Male',
    doc: 'Cedula',
  },
];

const DocumentsRecords = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Documents & Certificates Records</h1>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="bg-gray-200 text-black font-semibold px-6 py-4 rounded shadow hover:bg-gray-300">
            <div className="text-2xl">📄</div>
            Show Document list
          </button>
          <button className="bg-gray-200 text-black font-semibold px-6 py-4 rounded shadow hover:bg-gray-300">
            <div className="text-2xl">📃</div>
            Show Certificate list
          </button>
          <button className="bg-gray-200 text-black font-semibold px-6 py-4 rounded shadow hover:bg-gray-300">
            <div className="text-2xl">📝</div>
            Request Document
          </button>
        </div>

        {/* Table */}
        <div className="shadow-lg border rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Document Records</h2>
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
                <th className="px-4 py-3 font-semibold">Resident ID</th>
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
                  <td className="px-4 py-3 font-medium">{item.residentId}</td> 
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

export default DocumentsRecords;