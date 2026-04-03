
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { FiFileText, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await api.get("/documents/all");
      setDocuments(res.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const total = documents.length;
  const fakeCount = documents.filter((d) => d.status === "FAKE").length;
  const genuineCount = documents.filter((d) => d.status === "GENUINE").length;

  if (loading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Monitor your document verification activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-3">
            <FiFileText className="text-blue-500" />
            <p className="text-sm text-gray-500">Total Documents</p>
          </div>
          <h2 className="text-2xl font-bold mt-2">{total}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-3">
            <FiAlertCircle className="text-red-500" />
            <p className="text-sm text-gray-500">Fake Documents</p>
          </div>
          <h2 className="text-2xl font-bold mt-2 text-red-600">
            {fakeCount}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-green-500" />
            <p className="text-sm text-gray-500">Genuine Documents</p>
          </div>
          <h2 className="text-2xl font-bold mt-2 text-green-600">
            {genuineCount}
          </h2>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Documents</h2>

        {documents.length === 0 ? (
          <p className="text-gray-500">No documents uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-medium">{doc.originalName}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(doc.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-sm font-semibold ${
                      doc.status === "FAKE"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {doc.status}
                  </span>
                  <p className="text-xs text-gray-400">
                    {doc.confidence}% confidence
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}