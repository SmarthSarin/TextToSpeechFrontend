import React, { useState } from "react";
import supabase from "../supabaseClient";

export default function AuthForm({ isLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Signup successful! Check your email.");
  };

  const handlePasswordReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) alert(error.message);
    else alert("Reset link sent to your email.");
  };

  return (
    <>
      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        onChange={(e) => setPassword(e.target.value)}
      />

      {isLogin ? (
        <>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow mb-3"
          >
            Login
          </button>
          <p onClick={handlePasswordReset} className="text-blue-600 text-sm text-center cursor-pointer hover:underline">
            Forgot Password?
          </p>
        </>
      ) : (
        <button
          onClick={handleSignup}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow"
        >
          Signup
        </button>
      )}
    </>
  );
}
