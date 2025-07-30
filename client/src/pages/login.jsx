import React, { useState } from "react";
import AuthForm from "../components/authform";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white shadow-xl rounded-xl p-8">
        {/* App name + tagline */}
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-2">Speech to Text</h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Login or sign up to transcribe audio instantly
        </p>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-300">
          <button
            className={`flex-1 py-3 text-lg font-semibold transition ${
              isLogin ? "border-b-4 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 text-lg font-semibold transition ${
              !isLogin ? "border-b-4 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        {/* Auth Form */}
        <AuthForm isLogin={isLogin} />

        {/* Toggle message */}
        {isLogin ? (
          <p className="text-sm text-center text-gray-600 mt-4">
            New here?{" "}
            <span
              className="text-blue-600 font-medium cursor-pointer hover:underline"
              onClick={() => setIsLogin(false)}
            >
              Create your account
            </span>
          </p>
        ) : (
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-medium cursor-pointer hover:underline"
              onClick={() => setIsLogin(true)}
            >
              Log in here
            </span>
          </p>
        )}
      </div>
    </div>
  );
}