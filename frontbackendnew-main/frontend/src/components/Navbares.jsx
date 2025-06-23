import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Link } from 'react-router-dom';

const Navbares = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔍 Debug: Log user object
  console.log("✅ Logged-in user:", user);

  const avatarUrl =
    user?.profile?.avatar && user.profile.avatar !== ''
      ? `http://localhost:8000/storage/${user.profile.avatar}`
      : "https://flowbite.com/docs/images/people/profile-picture-5.jpg";

  return (
    <nav className="fixed top-0 z-50 w-full bg-green-800 shadow-lg border-b border-green-900">
      <div className="px-4 py-3 lg:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center ml-4">
            <img
              src="/assets/images/logo.jpg"
              alt="Barangay Logo"
              className="h-10 w-10 rounded-full border-2 border-white shadow-md"
            />
            <span className="ml-3 text-xl font-bold text-white hidden sm:block">
              Resident Portal
            </span>
          </Link>
        </div>

        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center bg-white p-1 rounded-full shadow-md focus:ring-2 focus:ring-green-500"
              aria-label="User menu"
            >
<img
  src={avatarUrl}
  alt="User Avatar"
  className="w-10 h-10 rounded-full object-cover"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://flowbite.com/docs/images/people/profile-picture-5.jpg";
  }}
/>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-xl z-50 animate-fade-in-up">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name || 'Resident Name'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.email || 'email@example.com'}
                  </p>
                </div>
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <Link to="/" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <i className="fas fa-home w-5 mr-2 text-green-600" /> Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <i className="fas fa-user w-5 mr-2 text-green-600" /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/messages" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <i className="fas fa-envelope w-5 mr-2 text-green-600" /> Messages
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/logout"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      <i className="fas fa-sign-out-alt w-5 mr-2" /> Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbares;
