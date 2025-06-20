import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../contexts/AuthContext"; // ✅ Using useAuth hook

const AdminDashboard = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth(); // ✅ Access user from context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include',
      });

      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed.');
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        setSuccess('Registration successful!');
      } else {
        setError('Token not received.');
      }

    } catch (err) {
      setError('Something went wrong.');
      console.error(err);
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
          {/* Dashboard cards */}
          {dashboardCards.map((card, i) => (
            <div key={i} className={`bg-white shadow-lg rounded-xl p-6 border-l-4 border-${card.color}-500`}>
              <div className="text-2xl font-bold text-gray-700">{card.value}</div>
              <div className="text-sm text-gray-500 mt-1">{card.title}</div>
            </div>
          ))}

          {/* Register Form Card */}
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
