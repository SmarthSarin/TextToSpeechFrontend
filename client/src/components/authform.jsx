import React, { useState } from "react";
import supabase from "../supabaseClient";
import { toast } from "react-toastify";

export default function AuthForm({ isLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully!");
    }
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signup successful! Check your email to verify.");
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast.warn("Enter your email to reset password.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Reset link sent to your email.");
    }
  };

  return (
    <>
      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-purple-400 outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-purple-400 outline-none"
        onChange={(e) => setPassword(e.target.value)}
      />

      {isLogin ? (
        <>
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white font-semibold py-3 rounded-lg shadow mb-3 transition-all"
          >
            Login
          </button>
          <p
            onClick={handlePasswordReset}
            className="text-sm text-center text-purple-600 cursor-pointer hover:underline"
          >
            Forgot Password?
          </p>
        </>
      ) : (
        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white font-semibold py-3 rounded-lg shadow transition-all"
        >
          Signup
        </button>
      )}
    </>
  );
}
