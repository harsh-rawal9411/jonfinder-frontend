import { useEffect, useState } from "react";
import API from "../services/api";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      // Employer route: get all applicants for employer's jobs
      const res = await API.get(`/applications/employer`);
      setApplications(res.data); // direct list of applications
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const updateStatus = async (appId, newStatus) => {
    try {
      await API.put(`/applications/${appId}/status`, {
        status: newStatus,
      });

      // Update UI instantly
      setApplications((prev) =>
        prev.map((app) =>
          app._id === appId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Applications for Your Jobs</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600">No applications yet.</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {applications.map((app) => (
            <div key={app._id} className="bg-white p-5 shadow rounded-xl">

              {/* USER DETAILS */}
              <h2 className="text-lg font-semibold">
                {app.userId?.name || "Unnamed User"}
              </h2>
              <p className="text-gray-600">{app.userId?.email}</p>

              {/* JOB DETAILS */}
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Job:</span> {app.jobId?.title}
              </p>

              {/* STATUS */}
              <p className="text-gray-700 mt-2">
                Status:{" "}
                <span className="font-bold capitalize">{app.status || "pending"}</span>
              </p>

              {/* RESUME */}
              {app.resumeURL && (
                <a
                  href={app.resumeURL}
                  target="_blank"
                  className="text-blue-600 underline block mt-3"
                >
                  View Resume
                </a>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => updateStatus(app._id, "shortlisted")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Shortlist
                </button>

                <button
                  onClick={() => updateStatus(app._id, "rejected")}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Reject
                </button>

                <button
                  onClick={() => updateStatus(app._id, "selected")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Select
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
