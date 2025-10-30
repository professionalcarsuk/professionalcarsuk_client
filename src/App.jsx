import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { clientRoutes } from "./routes";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {clientRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
