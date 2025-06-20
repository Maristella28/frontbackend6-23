import React, { useState } from 'react';

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const CommunicationAnnouncement = () => {
  // Dummy data for announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Water Interruption',
      content: 'There will be no water supply from 8AM to 5PM tomorrow.',
      timedate: 'June 9, 2025 - 10:00 AM',
    },
    {
      id: 2,
      title: 'Community Clean-up',
      content: 'Join us for a clean-up drive this Saturday at 7AM.',
      timedate: 'June 8, 2025 - 02:00 PM',
    },
  ]);

  // Dummy data for resident feedbacks
  const [residentFeedbacks, setResidentFeedbacks] = useState([
    {
      id: 1,
      name: 'John Doe',
      feedback: 'Thanks for the update on the water cut-off!',
      timedate: 'June 9, 2025 - 11:00 AM',
    },
    {
      id: 2,
      name: 'Jane Smith',
      feedback: 'Traffic was really bad during the fiesta. Any plans to improve this?',
      timedate: 'June 8, 2025 - 06:00 PM',
    },
    {
      id: 3,
      name: 'Mark Johnson',
      feedback: 'Any new job opportunities at the barangay office?',
      timedate: 'June 7, 2025 - 09:30 AM',
    },
    {
      id: 4,
      name: 'Anna Lopez',
      feedback: 'Will the clean-up drive include the riverbank area?',
      timedate: 'June 8, 2025 - 03:45 PM',
    },
  ]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Communication and Announcement</h1>

        {/* Announcements Section */}
        <div className="shadow-lg border rounded-lg overflow-hidden mb-10">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Announcements</h2>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add Post
            </button>
          </div>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-lime-300 text-black text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Content</th>
                <th className="px-4 py-3">Time and Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-lime-100">
              {announcements.map((announcement) => (
                <tr key={announcement.id}>
                  <td className="px-4 py-3 font-medium">{announcement.title}</td>
                  <td className="px-4 py-3">{announcement.content}</td>
                  <td className="px-4 py-3">{announcement.timedate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resident Feedback Section */}
        <div className="shadow-lg border rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Resident Feedbacks</h2>
          </div>
          <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto bg-lime-100">
            {residentFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="border rounded p-4 bg-white shadow hover:bg-lime-50 transition"
              >
                <p className="font-semibold text-green-700">{feedback.name}</p>
                <p className="text-gray-700 mt-1">{feedback.feedback}</p>Add commentMore actions
                <p className="text-gray-500 text-xs mt-2">{feedback.timedate}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default CommunicationAnnouncement;