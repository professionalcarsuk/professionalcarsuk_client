import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { adminLogin } = useAdminAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Login successful
        adminLogin({
          email: data.user.email,
          name: data.user.username,
          role: data.user.role,
        });
        navigate("/admin");
      } else {
        // Login failed
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">Professional Cars Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@professionalcars.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/admin/forgot-password"
                className="text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Website
          </Link>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Demo Credentials:</strong>
            <br />
            Email: admin@professionalcars.com
            <br />
            Password: Admin123!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
