import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Users, FileText, Clock, Home, AlertTriangle, UserCheck } from 'lucide-react';

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

  return (
    <nav className="fixed top-0 z-50 w-full bg-green-800 shadow-lg border-b border-green-900">
      <div className="px-4 py-3 lg:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center ml-4">
            <img src="/assets/images/logo.jpg" alt="Barangay Logo" className="h-10 w-10 rounded-full border-2 border-white shadow-md" />
            <span className="ml-3 text-xl font-bold text-white hidden sm:block">Resident Portal</span>
          </a>
        </div>

        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center bg-white p-1 rounded-full shadow-md focus:ring-2 focus:ring-green-500"
            >
              <img
                src={user.avatar || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-xl z-50 animate-fade-in-up">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">{user.name || 'Resident Name'}</p>
                  <p className="text-sm text-gray-500">{user.email || 'email@example.com'}</p>
                </div>
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <i className="fas fa-home w-5 mr-2 text-green-600" /> Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <i className="fas fa-user w-5 mr-2 text-green-600" /> Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <i className="fas fa-envelope w-5 mr-2 text-green-600" /> Messages
                    </a>
                  </li>
                  <li>
                    <a href="/logout" className="flex items-center px-4 py-2 hover:bg-gray-100 text-red-600">
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
