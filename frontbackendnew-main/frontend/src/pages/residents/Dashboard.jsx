import React, { useEffect, useState } from 'react';
import Navbares from '../../components/Navbares';
import Sidebares from '../../components/Sidebares';
import axios from '../../utils/axiosConfig';

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
        setError('❌ Failed to load announcements. Please login or try again later.');
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <>
      <Navbares />
      <Sidebares />

      <main className="bg-gradient-to-br from-green-50 to-white min-h-screen ml-64 pt-20 px-6 py-10 font-sans flex flex-col items-center">
        <div className="w-full max-w-5xl space-y-12">

          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="text-4xl bg-green-200 text-green-800 p-4 rounded-full shadow-lg">
              📢
            </div>
            <h1 className="text-4xl font-extrabold text-green-900 tracking-wide">
              Latest Announcements
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-5 py-4 rounded-xl shadow-sm text-sm">
              {error}
            </div>
          )}

          {/* Announcements */}
          <div className="space-y-10 w-full">
            {announcements.length === 0 && !error ? (
              <div className="text-gray-500 text-lg italic bg-white p-6 border rounded-xl shadow text-center">
                📭 No announcements available at the moment.
              </div>
            ) : (
              announcements.map((a) => (
                <div
                  key={a.id}
                  className="bg-white border border-green-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <h2 className="text-2xl font-bold text-green-800 mb-3 group-hover:underline">
                    {a.title}
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    {a.content}
                  </p>

                  {a.image && (
                    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                      <img
                        src={`http://localhost:8000/storage/${a.image}`}
                        alt="Announcement"
                        className="w-full max-h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <p className="text-sm text-gray-500 mt-4">
                    📅 Posted on:{' '}
                    {a.published_at
                      ? new Date(a.published_at).toLocaleString()
                      : new Date(a.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
