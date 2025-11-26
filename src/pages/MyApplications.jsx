import { useEffect, useState } from "react";
import API from "../services/api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyApplications = async () => {
    try {
      const res = await API.get("/applications/my");
      setApplications(res.data); // backend returns an array directly
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyApplications();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600">No applications yet.</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white p-5 rounded-xl shadow"
            >
              {/* Job Info */}
              <h2 className="text-lg font-bold">
                {app.jobId?.title || "Job removed"}
              </h2>

              <p className="text-gray-600">
                📍 {app.jobId?.location || "N/A"}
              </p>
              <p className="text-gray-600">
                💰 {app.jobId?.salary || "N/A"}
              </p>

              {/* Status */}
              <p className="mt-2 text-gray-700">
                <strong>Status:</strong>{" "}
                <span className="capitalize font-semibold">
                  {app.status || "pending"}
                </span>
              </p>

              {/* Applied Date */}
              <p className="text-sm text-gray-500 mt-1">
                Applied on: {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
