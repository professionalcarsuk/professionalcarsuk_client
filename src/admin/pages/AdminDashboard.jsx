import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Listings</h2>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Active Listings</h2>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Pending Reviews</h2>
          <p className="text-3xl font-bold text-yellow-600">0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
