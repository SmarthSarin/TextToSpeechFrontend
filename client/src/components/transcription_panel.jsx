import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function TranscriptionPanel({ user }) {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) fetchHistory(user.id);
  }, [user]);

  const fetchHistory = async (userId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/transcriptions/${userId}`);
      setHistory(res.data.transcriptions);
    } catch (err) {
      console.error("Failed to load history:", err.message);
      setErrorMessage("Failed to load history");
    }
  };

  const handleUpload = async () => {
    if (!file) return setErrorMessage("Please select a file first.");

    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];
    if (!allowedTypes.includes(file.type)) {
      return setErrorMessage("Invalid file type. Only MP3/WAV allowed.");
    }

    const formData = new FormData();
    formData.append("audio", file);
    formData.append("user_id", user.id);

    setLoading(true);
    setErrorMessage("");
    setTranscription("");

    try {
      const res = await axios.post(`${API_BASE_URL}/transcribe`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTranscription(res.data.transcription);
      fetchHistory(user.id);
    } catch (err) {
      console.error("Upload error:", err.message);
      setErrorMessage("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Upload Section */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Transcribe Your Audio</h2>
        <label className="block border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition">
          <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
          <p className="text-gray-600">
            <span className="text-blue-600 font-semibold">+</span> Click to upload audio
          </p>
          {file && <p className="mt-2 text-sm text-gray-800">{file.name}</p>}
        </label>

        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

        <button
          onClick={handleUpload}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Transcribing..." : "Start Transcription"}
        </button>

        {transcription && (
          <div className="mt-6 bg-gray-100 rounded-lg p-4">
            <h3 className="text-blue-600 font-semibold mb-2">Latest Transcription:</h3>
            <p className="text-gray-800">{transcription}</p>
          </div>
        )}
      </div>

      {/* History Section */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Previous Transcriptions</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No history yet.</p>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <strong>{item.file_name}</strong>
                <p className="text-gray-600 mt-1">{item.transcription}</p>
                <span className="text-xs text-gray-400 block mt-2">
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}