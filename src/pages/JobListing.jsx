import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
const navigate = useNavigate();

  // For future filters (location, salary, role)
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data.jobs || res.data); // depends on your backend format
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">

      <h1 className="text-2xl font-bold mb-4 text-center">
        Available Jobs
      </h1>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search job title..."
          className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-white p-5 rounded-xl shadow">

              <h2 className="text-xl font-semibold">{job.title}</h2>

              <p className="text-gray-700 mt-2 line-clamp-2">
                {job.description}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                📍 {job.location}
              </p>

              <p className="text-sm text-gray-500">💰 {job.salary}</p>

              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                View Details
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default JobListing;
