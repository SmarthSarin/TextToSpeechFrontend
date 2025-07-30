import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import TranscriptionPanel from "../components/transcription_panel";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data?.session?.user;
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-yellow-50 text-gray-800 px-4 py-12 flex flex-col items-center">
    <button
      onClick={handleLogout}
      className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm"
    >
      Logout
    </button>

    <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-2">
      Speech to Text
    </h1>
    <p className="text-center text-gray-500 mb-10 max-w-xl">
      Convert your voice into clear, readable text. Just upload your audio file and get started!
    </p>

    <div className="w-full max-w-5xl">
      {user && <TranscriptionPanel user={user} />}
    </div>
  </div>
);
}