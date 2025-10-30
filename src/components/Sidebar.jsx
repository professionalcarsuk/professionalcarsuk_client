import React from "react";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={onClose}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            ✕ Close
          </button>
          <ul className="space-y-2">
            <li>
              <a href="/" className="block p-2 hover:bg-gray-100">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard" className="block p-2 hover:bg-gray-100">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/profile" className="block p-2 hover:bg-gray-100">
                Profile
              </a>
            </li>
            <li>
              <a href="/settings" className="block p-2 hover:bg-gray-100">
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
