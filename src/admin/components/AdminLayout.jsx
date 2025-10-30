import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../contexts/AdminAuthContext";

const AdminLayout = () => {
  const { adminLogout, adminUser } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel - Professional Cars</h1>
          <div className="flex items-center space-x-4">
            {adminUser && (
              <span className="text-sm text-gray-300">
                Welcome, {adminUser.name}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
            <Link to="/" className="text-blue-300 hover:text-blue-100">
              ← Back to Website
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Admin Sidebar */}
        <nav className="w-64 bg-white shadow-lg min-h-screen p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="block p-3 rounded hover:bg-gray-100">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/listings"
                className="block p-3 rounded hover:bg-gray-100"
              >
                Manage Listings
              </Link>
            </li>
            <li>
              <Link
                to="/admin/add-listing"
                className="block p-3 rounded hover:bg-gray-100"
              >
                Add New Listing
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
