import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from "./pages/Welcome";
import ProtectedRoute from './components/ProtectedRoute';

import AdminLayout from "./AdminLayout";
import ResidentLayout from "./ResidentLayout";

// Grouped imports from index.js
import * as AdminPages from './pages/admin';
import * as ResidentPages from './pages/residents';

const adminRoutes = [
  { path: "dashboard", element: <AdminPages.AdminDashboard /> },
  { path: "documentsRecords", element: <AdminPages.DocumentsRecords /> },
  { path: "residentsRecords", element: <AdminPages.ResidentsRecords /> },
  { path: "householdRecords", element: <AdminPages.HouseholdRecords /> },
  { path: "blotterRecords", element: <AdminPages.BlotterRecords /> },
  { path: "financialTracking", element: <AdminPages.FinancialTracking /> },
  { path: "barangayOfficials", element: <AdminPages.BarangayOfficials /> },
  { path: "communicationAnnouncement", element: <AdminPages.CommunicationAnnouncement /> },
  { path: "disasterEmergency", element: <AdminPages.DisasterEmergency /> },
  { path: "inventoryAssets", element: <AdminPages.InventoryAssets /> },
  { path: "projectManagement", element: <AdminPages.ProjectManagement /> },
  { path: "socialServices", element: <AdminPages.SocialServices /> },
];

const residentRoutes = [
  { path: "dashboard", element: <ResidentPages.Dashboard /> },
  { path: "blotterAppointment", element: <ResidentPages.BlotterAppointment /> },
  { path: "organizationalChart", element: <ResidentPages.OrganizationalChart /> },
  { path: "projects", element: <ResidentPages.Projects /> },
  { path: "requestAssets", element: <ResidentPages.RequestAssets /> },
  { path: "requestDocuments", element: <ResidentPages.RequestDocuments /> },
];

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
        >
          {adminRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Resident Routes */}
        <Route
          path="/residents"
          element={<ProtectedRoute><ResidentLayout /></ProtectedRoute>}
        >
          {residentRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
