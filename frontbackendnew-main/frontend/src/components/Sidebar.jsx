import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // ✅ make sure this is imported

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const adminItems = [
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

  const staffItems = [
    { title: "Dashboard", icon: "fa-chart-pie", path: "/staff/dashboard" },
    { title: "Residents Records", icon: "fa-users", path: "/staff/residentsRecords" },
    { title: "Document Records", icon: "fa-file-alt", path: "/staff/documentsRecords" },
    { title: "Household Records", icon: "fa-house", path: "/staff/householdRecords" },
    { title: "Barangay Official & Staff", icon: "fa-user-tie", path: "/staff/barangayOfficials" },
    { title: "Communication & Announcement", icon: "fa-bullhorn", path: "/staff/communicationAnnouncement" },
    { title: "Social Services", icon: "fa-hands-helping", path: "/staff/socialServices" },
    { title: "Disaster & Emergency", icon: "fa-triangle-exclamation", path: "/staff/disasterEmergency" },
    { title: "Project Management", icon: "fa-diagram-project", path: "/staff/projectManagement" },
    { title: "Inventory Assets", icon: "fa-boxes-stacked", path: "/staff/inventoryAssets" },
  ];

  const treasurerItems = [
    { title: "Dashboard", icon: "fa-chart-pie", path: "/treasurer/dashboard" },
    { title: "Financial Tracking", icon: "fa-money-bill-trend-up", path: "/treasurer/financialTracking" },
  ];

  // Fallback
  const defaultItems = [
    { title: "Dashboard", icon: "fa-chart-pie", path: "/" },
  ];

  let menuItems = defaultItems;

  if (user?.role === "admin") menuItems = adminItems;
  else if (user?.role === "staff") menuItems = staffItems;
  else if (user?.role === "treasurer") menuItems = treasurerItems;

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-gradient-to-b from-green-900 to-green-800 shadow-2xl border-r border-green-700">
      <div className="flex flex-col h-full px-4 py-6 overflow-y-auto text-white space-y-6 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-800">

        <div className="flex items-center justify-center gap-3">
          <i className="fa-solid fa-leaf text-3xl text-lime-300"></i>
          <h2 className="text-2xl font-extrabold tracking-wide text-lime-100">Sidebar</h2>
        </div>

        <hr className="border-green-700" />

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

        <div className="text-sm text-green-300 text-center pt-6 border-t border-green-700">
          <p>&copy; 2025 Barangay System</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
