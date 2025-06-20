import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // adjust path as needed

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // 👈 get user and logout from context

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    if (confirmLogout) {
      await logout();
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-green-800 shadow-lg border-b border-green-900">
      <div className="px-4 py-3 lg:px-6 flex items-center justify-between">
        {/* Left: Logo and Toggle */}
        <div className="flex items-center">
          <button
            type="button"
            className="sm:hidden inline-flex items-center p-2 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-400"
            aria-controls="logo-sidebar"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <a href="/" className="flex items-center ml-4">
            <img
              src="/assets/images/logo.jpg"
              alt="Barangay Logo"
              className="h-10 w-10 rounded-full border-2 border-white shadow-md"
            />
            <span className="ml-3 text-xl font-bold text-white hidden sm:block">
              E-Governance Barangay Management System
            </span>
          </a>
        </div>

        {/* Right: Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center bg-white p-1 rounded-full shadow-md focus:ring-2 focus:ring-green-500"
          >
            <img
              src={user?.avatar || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
              alt="user"
              className="w-10 h-10 rounded-full"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-xl z-50 animate-fade-in-up">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name || "Loading..."}
                </p>
                <p className="text-sm text-gray-500">{user?.email || ""}</p>
              </div>
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <i className="fas fa-tachometer-alt w-5 mr-2 text-green-600" /> Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <i className="fas fa-cog w-5 mr-2 text-green-600" /> Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <i className="fas fa-wallet w-5 mr-2 text-green-600" /> Earnings
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    <i className="fas fa-sign-out-alt w-5 mr-2" /> Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
