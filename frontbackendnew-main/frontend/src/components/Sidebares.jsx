import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebares = () => {
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: "fa-chart-line", path: "/residents/dashboard" },
    { title: "Projects", icon: "fa-lightbulb", path: "/residents/projects" },
    { title: "Request Documents", icon: "fa-file-signature", path: "/residents/requestDocuments" },
    { title: "Request Assets", icon: "fa-dolly", path: "/residents/requestAssets" },
    { title: "Blotter Appointment", icon: "fa-calendar-days", path: "/residents/blotterAppointment" },
    { title: "Organizational Chart", icon: "fa-network-wired", path: "/residents/organizationalChart" },
  ];

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-gradient-to-b from-green-900 to-green-800 shadow-2xl border-r border-green-700">
      <div className="flex flex-col h-full px-4 py-6 overflow-y-auto text-white space-y-6 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-800">
        
        {/* Logo or Brand Title */}
        <div className="flex items-center justify-center gap-3">
          <i className="fa-solid fa-user-house text-3xl text-lime-300"></i>
          <h2 className="text-2xl font-extrabold tracking-wide text-lime-100">Resident Panel</h2>
        </div>

        <hr className="border-green-700" />

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-1">
            {menuItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group
                      ${isActive
                        ? "bg-green-700 font-semibold text-white shadow-md shadow-lime-300"
                        : "hover:bg-green-700 hover:text-white text-green-100"
                      }`}
                  >
                    <i className={`fa-solid ${item.icon} w-5 text-lg group-hover:text-white`} />
                    <span className="truncate text-sm tracking-wide">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="text-sm text-green-300 text-center pt-6 border-t border-green-700">
          <p>&copy; 2025 Barangay System</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebares;