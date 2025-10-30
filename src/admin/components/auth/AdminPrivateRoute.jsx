import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

const AdminPrivateRoute = ({ children }) => {
  const { isAdminAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return isAdminAuthenticated ? (
    children
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

export default AdminPrivateRoute;
