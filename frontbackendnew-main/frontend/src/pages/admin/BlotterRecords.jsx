import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const BlotterRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const blotterData = [
    {
      residentId: 'RES-001', 
      residentName: 'Juan Dela Cruz',
      dateTime: 'June 10, 2025 - 10:00 AM',
      complaint: 'Noise Complaint',
      status: 'Scheduled',
    },
    {
      residentId: 'RES-002', 
      residentName: 'Maria Clara',
      dateTime: 'June 11, 2025 - 2:00 PM',
      complaint: 'Property Damage',
      status: 'Pending',
    },
    {
      residentId: 'RES-003',
      residentName: 'Jose Rizal',
      dateTime: 'June 12, 2025 - 9:00 AM',
      complaint: 'Threats',
      status: 'Completed',
    },
  ];

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Blotter Scheduling Record</h1>

        {/* Top Bar */}
        <div className="shadow-lg border rounded-lg overflow-hidden mb-6">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">List of Blotter Scheduling</h2>
            <div className="flex items-center gap-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                + Add New Appointment
              </button>
              <input
                type="text"
                placeholder="Search Resident Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none text-sm"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-10 py-2 border rounded text-sm"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <table className="min-w-full text-sm text-left">
            <thead className="bg-lime-300 text-black text-xs uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">Resident ID</th> {/* Added column */}
                <th className="px-4 py-3 font-semibold">Resident Name</th>
                <th className="px-4 py-3 font-semibold">Date & Time</th>
                <th className="px-4 py-3 font-semibold">Complaint Summary</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-lime-100">
              {blotterData
                .filter((item) =>
                  (statusFilter === 'All' || item.status === statusFilter) &&
                  item.residentName.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 font-medium">{item.residentId}</td> {/* Display Resident ID */}
                    <td className="px-4 py-3">{item.residentName}</td>
                    <td className="px-4 py-3">{item.dateTime}</td>
                    <td className="px-4 py-3">{item.complaint}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          item.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : item.status === 'Scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : item.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">
                        Cancel
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

export default BlotterRecords;