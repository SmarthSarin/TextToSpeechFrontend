import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import TranscriptionPanel from "../components/transcription_panel";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return navigate("/");
      setUser(data.session.user);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/");
      else setUser(session.user);
    });

    return () => listener?.subscription?.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">
          Logged in as <span className="font-bold">{user?.email}</span>
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
      <TranscriptionPanel user={user} />
    </div>
  );
}
