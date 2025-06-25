import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import axios from "../../utils/axiosConfig"; // Make sure this includes your token logic

const ResidentsRecords = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const res = await axios.get('/api/admin/residents');
        setResidents(res.data.residents);
      } catch (err) {
        console.error("Error loading residents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  const handleUpdate = (residentId) => {
    // Redirect or show a modal to update household number
    window.location.href = `/admin/residents/${residentId}/edit`;
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Residents Records</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="shadow-lg border rounded-lg overflow-hidden">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-lime-300 text-black text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Resident ID</th>
                  <th className="px-4 py-3 font-semibold">Fullname</th>
                  <th className="px-4 py-3 font-semibold">Age</th>
                  <th className="px-4 py-3 font-semibold">Civil Status</th>
                  <th className="px-4 py-3 font-semibold">Gender</th>
                  <th className="px-4 py-3 font-semibold">Voter Status</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-lime-100">
                {residents.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3">{r.residents_id}</td>
                    <td className="px-4 py-3">{`${r.first_name} ${r.last_name}`}</td>
                    <td className="px-4 py-3">{r.age}</td>
                    <td className="px-4 py-3">{r.civil_status}</td>
                    <td className="px-4 py-3">{r.sex}</td>
                    <td className="px-4 py-3">{r.voter_status}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleUpdate(r.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
};

export default ResidentsRecords;
