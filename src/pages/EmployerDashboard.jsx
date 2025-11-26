import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyJobs = async () => {
    try {
      const res = await API.get("/jobs/my-jobs");
      setJobs(res.data.jobs || res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">Employer Dashboard</h1>

        <button
          onClick={() => navigate("/employer/create-job")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Job
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found. Create your first job!</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-5 rounded-lg shadow">
                <h2 className="text-lg font-bold">{job.title}</h2>
                <p className="text-gray-600">{job.location}</p>
                <p className="text-gray-600">💰 {job.salary}</p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => navigate(`/employer/edit-job/${job._id}`)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => navigate(`/employer/applications/${job._id}`)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Applications
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
