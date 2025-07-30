import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import supabase from "./supabaseClient";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import ResetPassword from "./pages/reset_password";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setCheckingSession(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (checkingSession) {
    return <div className="text-center mt-20 text-gray-600">Checking session...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>
  );
}
