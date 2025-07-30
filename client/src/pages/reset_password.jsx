import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [sessionValid, setSessionValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        toast.error("Authentication session missing. Use the link from your email.");
      } else {
        setSessionValid(true);
      }
      setLoading(false);
    };
    validateSession();
  }, []);

  const handleReset = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message || "Password reset failed.");
    } else {
      toast.success("Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Validating session...</p>;
  }

  if (!sessionValid) {
    return (
      <p className="text-center text-red-600 font-medium mt-20">
        Invalid or expired reset link. Please check your email again.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-yellow-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-purple-700 text-center mb-2">Speech to Text</h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Reset your password to continue using the app
        </p>

        <input
          type="password"
          placeholder="New Password"
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-purple-400 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="border border-gray-300 rounded-lg p-3 w-full mb-6 focus:ring-2 focus:ring-purple-400 outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white font-semibold py-3 rounded-lg shadow transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
