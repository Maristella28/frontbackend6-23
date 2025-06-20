import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const InventoryAssets = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      residentId: 'RES-001', // Added resident ID
      residentName: 'Juan Dela Cruz',
      item: 'Tent',
      rentDateTime: '2025-06-15 09:00 AM',
      returnDateTime: '2025-06-16 05:00 PM',
      deliveryAddress: '123 Main St, Barangay Example',
      rentalFee: 500,
      status: 'Pending',
    },
    {
      id: 2,
      residentId: 'RES-002', // Added resident ID
      residentName: 'Maria Santos',
      item: 'Plastic Chairs (20 pcs)',
      rentDateTime: '2025-06-18 02:00 PM',
      returnDateTime: '2025-06-18 10:00 PM',
      deliveryAddress: '456 Example Road, Barangay Sample',
      rentalFee: 300,
      status: 'Pending',
    },
  ]);

  const handleDelete = (id) => {
    const updatedRequests = requests.filter((request) => request.id !== id);
    setRequests(updatedRequests);
  };

  const handleApprove = (id) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: 'Approved' } : request
    );
    setRequests(updatedRequests);
  };

  const handleDecline = (id) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: 'Declined' } : request
    );
    setRequests(updatedRequests);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Inventory & Asset Rental Requests</h1>
        <div className="shadow-lg border rounded-lg overflow-hidden mb-10">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">List of Resident Requests</h2>
          </div>

          <table className="min-w-full text-sm text-left">
            <thead className="bg-lime-300 text-black text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-center">Resident ID</th> {/* Added column */}
                <th className="px-4 py-3 text-center">Resident Name</th>
                <th className="px-4 py-3 text-center">Item Requested</th>
                <th className="px-4 py-3 text-center">Date & Time of Rent</th>
                <th className="px-4 py-3 text-center">Date & Time of Return</th>
                <th className="px-4 py-3 text-center">Delivery Address</th>
                <th className="px-4 py-3 text-center">Rental Fee (₱)</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-lime-100">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-3 text-center font-medium">{request.residentId}</td> {/* Added value */}
                  <td className="px-4 py-3 text-center font-medium">{request.residentName}</td>
                  <td className="px-4 py-3 text-center">{request.item}</td>
                  <td className="px-4 py-3 text-center">{request.rentDateTime}</td>
                  <td className="px-4 py-3 text-center">{request.returnDateTime}</td>
                  <td className="px-4 py-3 text-center">{request.deliveryAddress}</td>
                  <td className="px-4 py-3 text-center">₱{request.rentalFee}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        request.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-y-1">
                    {request.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mb-1 text-xs"
                        >
                          Approve
                        </button>
                        <br />
                        <button
                          onClick={() => handleDecline(request.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mb-1 text-xs"
                        >
                          Decline
                        </button>
                        <br />
                      </>
                    )}
                    {request.status === 'Approved' && (
                      <p className="text-green-600 font-semibold text-xs">Receipt ready for resident</p>
                    )}
                    {request.status === 'Declined' && (
                      <p className="text-red-600 font-semibold text-xs">Request Declined</p>
                    )}
                    <br />
                    <button
                      onClick={() => handleDelete(request.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-4 py-5 text-center text-gray-500">
                    No requests at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default InventoryAssets;