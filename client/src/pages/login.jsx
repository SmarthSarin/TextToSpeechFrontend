import React, { useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate("/dashboard");
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Signup successful! Please check your email.");
  };

  const handlePasswordReset = async () => {
    if (!email) return alert("Enter email first");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) alert(error.message);
    else alert("Password reset email sent.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-[#1F487E] mb-8">Talk2Text</h1>
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md">
        <div className="flex mb-6 border-b border-gray-300">
          <button
            className={`flex-1 py-3 text-lg font-semibold ${isLogin ? "border-b-4 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 text-lg font-semibold ${!isLogin ? "border-b-4 border-green-500 text-green-600" : "text-gray-500"}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}
          className="mb-4 w-full p-3 border rounded-lg outline-none focus:ring-2" />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}
          className="mb-4 w-full p-3 border rounded-lg outline-none focus:ring-2" />

        {isLogin ? (
          <>
            <button onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3">
              Login
            </button>
            <p onClick={handlePasswordReset}
              className="text-blue-600 text-sm cursor-pointer hover:underline text-center">
              Forgot Password?
            </p>
          </>
        ) : (
          <button onClick={handleSignup}
            className="w-full bg-green-600 text-white py-3 rounded-lg">
            Signup
          </button>
        )}
      </div>
    </div>
  );
}
