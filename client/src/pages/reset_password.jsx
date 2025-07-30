import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        setError("Auth session missing! Please use the link from your email.");
      }
      setLoading(false);
    };
    validateSession();
  }, []);

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setMessage("");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setMessage("");
    } else {
      setError("");
      setMessage("Password reset successful!");
    }
  };

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Validating session...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8">
        {/* App Branding */}
        <h1 className="text-3xl font-extrabold text-blue-600 text-center mb-2">🎤 Speech to Text</h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Reset your password to continue using the app
        </p>

        <input
          type="password"
          placeholder="New Password"
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {message ? (
          <div className="text-center">
            <p className="text-green-600 text-sm mb-4">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <button
            onClick={handleReset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow"
          >
            Reset Password
          </button>
        )}
      </div>
    </div>
  );
}
