import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../contexts/AuthContext";

const AdminDashboard = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'resident',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Get token from localStorage
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("No auth token found.");

      const res = await fetch('http://localhost:8000/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed.');
        return;
      }

      setSuccess('User registered successfully!');
      setForm({ name: '', email: '', password: '', role: 'resident' }); // Reset form
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  const dashboardCards = [
    { title: "Total Residents", value: "1,245", color: "lime" },
    { title: "Certificates Issued", value: "58", color: "purple" },
    { title: "Pending Requests", value: "16", color: "blue" },
    { title: "Household Records", value: "12", color: "amber" },
    { title: "Blotter Reports", value: "8", color: "rose" },
    { title: "Barangay Officials", value: "3", color: "teal" },
  ];

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-gray-100 min-h-screen ml-64 pt-20 p-6 font-sans">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome{user?.name ? `, ${user.name}` : ''}!
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, i) => (
            <div key={i} className={`bg-white shadow-lg rounded-xl p-6 border-l-4 border-${card.color}-500`}>
              <div className="text-2xl font-bold text-gray-700">{card.value}</div>
              <div className="text-sm text-gray-500 mt-1">{card.title}</div>
            </div>
          ))}

          {/* Register Form */}
          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-indigo-500 col-span-1 sm:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Register New User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="resident">Resident</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="treasurer">Treasurer</option>
              </select>

              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Register
              </button>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
