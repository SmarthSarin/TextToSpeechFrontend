import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import ResetPassword from "./ResetPassword";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
