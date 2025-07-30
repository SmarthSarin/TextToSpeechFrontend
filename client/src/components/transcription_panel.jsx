import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { toast } from "react-toastify";

export default function TranscriptionPanel({ user }) {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchHistory(user.id);
  }, [user]);

  const fetchHistory = async (userId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/transcriptions/${userId}`);
      setHistory(res.data.transcriptions);
    } catch (err) {
      console.error("Failed to load history:", err.message);
      toast.error("Failed to load history.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warn("Please select a file first.");
      return;
    }

    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only MP3/WAV allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", file);
    formData.append("user_id", user.id);

    setLoading(true);
    setTranscription("");
    toast.info("Uploading and transcribing...");

    try {
      const res = await axios.post(`${API_BASE_URL}/transcribe`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTranscription(res.data.transcription);
      toast.success("Transcription complete!");
      fetchHistory(user.id);
    } catch (err) {
      console.error("Upload error:", err.message);
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <div className="text-center mb-6">
          <div className="border-2 border-dashed border-purple-300 rounded-lg py-10 px-6 cursor-pointer hover:border-purple-500 transition">
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="block text-gray-500 text-sm">
              <div className="text-purple-600 font-semibold mb-2">Upload or drag an audio file here</div>
              <div className="text-xs text-gray-400">
                Max <strong>50MB</strong>. Supported: <code>.mp3</code>, <code>.wav</code>
              </div>
              {file && <p className="mt-2 text-sm text-gray-800">{file.name}</p>}
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm"
          >
            {loading ? "Transcribing..." : "Upload & Transcribe"}
          </button>
        </div>

        {transcription && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-purple-700 font-semibold mb-2">Latest Transcription:</h3>
            <p className="text-gray-800">{transcription}</p>
          </div>
        )}
      </div>

      {/* History Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Previous Transcriptions</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No transcription history yet.</p>
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
