import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: "fa-chart-pie", path: "/admin/dashboard" },
    { title: "Residents Records", icon: "fa-users", path: "/admin/residentsRecords" },
    { title: "Document Records", icon: "fa-file-alt", path: "/admin/documentsRecords" },
    { title: "Household Records", icon: "fa-house", path: "/admin/householdRecords" },
    { title: "Blotter Scheduling Records", icon: "fa-book", path: "/admin/blotterRecords" },
    { title: "Financial Tracking", icon: "fa-money-bill-trend-up", path: "/admin/financialTracking" },
    { title: "Barangay Official & Staff", icon: "fa-user-tie", path: "/admin/barangayOfficials" },
    { title: "Communication & Announcement", icon: "fa-bullhorn", path: "/admin/communicationAnnouncement" },
    { title: "Social Services", icon: "fa-hands-helping", path: "/admin/socialServices" },
    { title: "Disaster & Emergency", icon: "fa-triangle-exclamation", path: "/admin/disasterEmergency" },
    { title: "Project Management", icon: "fa-diagram-project", path: "/admin/projectManagement" },
    { title: "Inventory Assets", icon: "fa-boxes-stacked", path: "/admin/inventoryAssets" },
  ];

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-gradient-to-b from-green-900 to-green-800 shadow-2xl border-r border-green-700">
      <div className="flex flex-col h-full px-4 py-6 overflow-y-auto text-white space-y-6 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-800">
        
        {/* Logo or Brand Title */}
        <div className="flex items-center justify-center gap-3">
          <i className="fa-solid fa-leaf text-3xl text-lime-300"></i>
          <h2 className="text-2xl font-extrabold tracking-wide text-lime-100">Admin Panel</h2>
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

        {/* Footer or User Info Placeholder */}
        <div className="text-sm text-green-300 text-center pt-6 border-t border-green-700">
          <p>&copy; 2025 Barangay System</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
