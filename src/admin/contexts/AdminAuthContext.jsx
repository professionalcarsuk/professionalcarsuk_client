import React, { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session
    const storedAdmin = localStorage.getItem("adminUser");
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const adminLogin = (adminData) => {
    setAdminUser(adminData);
    localStorage.setItem("adminUser", JSON.stringify(adminData));
  };

  const adminLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/admin/auth/logout", {
        method: "POST",
        credentials: "include", // Include cookies
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local state regardless of API call success
      setAdminUser(null);
      localStorage.removeItem("adminUser");
    }
  };

  const value = {
    adminUser,
    adminLogin,
    adminLogout,
    isAdminAuthenticated: !!adminUser,
    loading,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
