import React, { useEffect, useState } from 'react';
import Navbares from '../../components/Navbares';
import Sidebares from '../../components/Sidebares';
import axios from '../../utils/axiosConfig'; // ✅ this was missing!

const Dashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get('/api/announcements');
        setAnnouncements(res.data.announcements || []);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to load announcements. You may need to log in.');
      }
    }; 

    fetchAnnouncements();
  }, []);

  return (
    <>
      <Navbares />
      <Sidebares />
      <main className="ml-64 pt-20 px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">📢 Announcements</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="space-y-6">
          {announcements.map((a) => (
            <div key={a.id} className="bg-white p-6 border rounded-xl shadow">
              <h2 className="text-xl font-semibold text-green-700">{a.title}</h2>
              <p className="mt-2 text-gray-800">{a.content}</p>
              {a.image && (
                <img
                  src={`http://localhost:8000/storage/${a.image}`}
                  alt="announcement"
                  className="mt-4 max-w-full rounded"
                />
              )}
              <p className="text-xs text-gray-500 mt-2">
                Posted on {a.published_at
                  ? new Date(a.published_at).toLocaleString()
                  : new Date(a.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
