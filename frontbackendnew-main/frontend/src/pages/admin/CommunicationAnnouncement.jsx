import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../utils/axiosConfig';

const CommunicationAnnouncement = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', image: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get('/api/announcements');
      setAnnouncements(res.data.announcements || []);
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError('Failed to load announcements.');
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to post.");
      return;
    }

    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);

    if (form.image instanceof File) {
      formData.append('image', form.image);
    }

    try {
      if (isEditing && selectedAnnouncement) {
        formData.append('_method', 'PUT');
        await axios.post(`/api/announcements/${selectedAnnouncement.id}`, formData);
      } else {
        await axios.post('/api/announcements', formData);
      }
      await fetchAnnouncements();
      setForm({ title: '', content: '', image: null });
      setShowForm(false);
      setIsEditing(false);
      setSelectedAnnouncement(null);
    } catch (err) {
      console.error("Error submitting announcement:", err);
      if (err.response?.data?.errors) {
        console.log("Validation errors:", err.response.data.errors);
      }
      setError('Failed to submit announcement.');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axios.patch(`/api/announcements/${id}/toggle`);
      fetchAnnouncements();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/announcements/${id}`);
      fetchAnnouncements();
    } catch (err) {
      console.error("Error deleting announcement:", err);
    }
  };

  const handleEdit = (announcement) => {
    setForm({ title: announcement.title, content: announcement.content, image: null });
    setSelectedAnnouncement(announcement);
    setShowForm(true);
    setIsEditing(true);
  };

  if (authLoading) return <p className="p-4">Loading user...</p>;

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="ml-64 pt-20 p-8">
        <h1 className="text-2xl font-bold mb-4">📢 Announcements</h1>

        {error && <p className="text-red-500">{error}</p>}

        {user && (
          <button
            onClick={() => {
              setShowForm(prev => !prev);
              setIsEditing(false);
              setSelectedAnnouncement(null);
              setForm({ title: '', content: '', image: null });
            }}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {showForm ? 'Cancel' : '➕ Add Post'}
          </button>
        )}

        {user && showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="border p-2 w-full"
              required
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              className="border p-2 w-full h-60"
              required
            />
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
            <button
              type="submit"
              className={`px-4 py-2 text-white ${loading ? 'bg-gray-400' : 'bg-green-500'}`}
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditing ? 'Update' : 'Post'}
            </button>
          </form>
        )}

        <table className="w-full table-auto border text-sm mb-8">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a) => (
              <tr key={a.id}>
                <td className="p-2 border">{a.title}</td>
                <td className="p-2 border">{a.status}</td>
                <td className="p-2 border space-x-2">
                  <button onClick={() => setSelectedAnnouncement(a)} className="text-blue-500">View</button>
                  <button onClick={() => toggleStatus(a.id)} className="text-purple-500">
                    {a.status === 'posted' ? 'Hide' : 'Post'}
                  </button>
                  <button onClick={() => handleEdit(a)} className="text-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(a.id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedAnnouncement && !isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-2">{selectedAnnouncement.title}</h2>
              <p className="mb-4">{selectedAnnouncement.content}</p>
              {selectedAnnouncement.image && (
                <img
                  src={`http://localhost:8000/storage/${selectedAnnouncement.image}`}
                  alt="Announcement"
                  className="mb-4 w-full"
                />
              )}
              <p className="text-sm text-gray-500">Status: {selectedAnnouncement.status}</p>
              <p className="text-sm text-gray-500">
                Posted: {new Date(selectedAnnouncement.created_at).toLocaleString()}
              </p>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="mt-4 text-white bg-red-500 px-4 py-2"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default CommunicationAnnouncement;
