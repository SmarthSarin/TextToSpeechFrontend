import React, { useState } from "react";
import AuthForm from "../components/authform";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-yellow-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white shadow-xl rounded-xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-2">
          Speech to Text
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Login or sign up to transcribe audio instantly
        </p>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-300">
          <button
            className={`flex-1 py-3 text-lg font-semibold transition ${
              isLogin
                ? "border-b-4 border-purple-500 text-purple-700"
                : "text-gray-500 hover:text-purple-600"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 text-lg font-semibold transition ${
              !isLogin
                ? "border-b-4 border-purple-500 text-purple-700"
                : "text-gray-500 hover:text-purple-600"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        {/* Auth Form */}
        <AuthForm isLogin={isLogin} />

        {/* Forgot Password (handled inside AuthForm.jsx if needed) */}

        {/* Toggle login/signup message */}
        {isLogin ? (
          <p className="text-sm text-center text-gray-600 mt-4">
            New here?{" "}
            <span
              className="text-purple-600 font-medium cursor-pointer hover:underline"
              onClick={() => setIsLogin(false)}
            >
              Create your account
            </span>
          </p>
        ) : (
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-purple-600 font-medium cursor-pointer hover:underline"
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