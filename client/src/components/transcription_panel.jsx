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

  const handleFileChange = (e) => {
    setErrorMessage("");
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file first!");
      return;
    }

    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Invalid file type. Please upload an MP3 or WAV file.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", file);
    formData.append("user_id", user.id);

    setLoading(true);
    setErrorMessage("");
    setTranscription("");

    try {
      const response = await axios.post(`${API_BASE_URL}/transcribe`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTranscription(response.data.transcription);
      fetchHistory(user.id);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (userId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/transcriptions/${userId}`);
      setHistory(res.data.transcriptions);
    } catch (err) {
      console.error("Failed to load history:", err);
      setErrorMessage("Failed to load history");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <div className="flex justify-center mb-4">
          <div className="bg-[#1F487E] p-4 rounded-full">
            <span className="text-white text-3xl">🎤</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#1F487E] mb-4 text-center">Transcribe your audio file</h2>
        <p className="text-gray-500 mb-6 text-center">Upload an audio file to transcribe.</p>

        <label className="block border-2 border-dashed border-gray-300 rounded-lg py-8 cursor-pointer hover:border-[#247BA0] transition text-center">
          <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
          <p className="text-gray-500">
            <span className="text-[#1F487E] font-semibold">+</span> Click to upload
          </p>
          {file && <p className="text-gray-700 mt-2">{file.name}</p>}
        </label>

        {errorMessage && (
          <p className="text-red-500 mt-4 text-center font-semibold">{errorMessage}</p>
        )}

        <button
          onClick={handleUpload}
          className="mt-6 w-full bg-[#1F487E] hover:bg-[#247BA0] text-white font-semibold py-3 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Transcribing..." : "Start Transcription"}
        </button>

        {transcription && (
          <div className="mt-6 bg-gray-100 rounded-lg p-4">
            <h3 className="text-[#1F487E] font-semibold mb-2">Latest Transcription:</h3>
            <p>{transcription}</p>
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-[#1F487E] mb-4">Previous Transcriptions</h2>
        {!user ? (
          <p className="text-gray-500">Login to view your history.</p>
        ) : history.length === 0 ? (
          <p className="text-gray-500">No history available.</p>
        ) : (
          <div className="max-h-[500px] overflow-y-auto space-y-4">
            {history.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-lg transition bg-gray-50">
                <strong className="text-gray-800">{item.file_name}</strong>
                <p className="text-gray-600 mt-1">{item.transcription}</p>
                <span className="text-xs text-gray-400 mt-2 block">
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
