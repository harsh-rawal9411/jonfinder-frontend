import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data.job || res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleApply = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (user.role !== "jobseeker") {
      setMessage("Only job seekers can apply.");
      return;
    }

    setApplyLoading(true);
    setMessage("");

    try {
      await API.post(`applications/${id}/apply`);
      setMessage("Application submitted successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to apply");
    }

    setApplyLoading(false);
  };

  useEffect(() => {
    fetchJob();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!job) {
    return <p className="text-center mt-10">Job not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold">{job.title}</h1>

        <p className="text-gray-600 mt-2">
          📍 {job.location}
        </p>

        <p className="text-gray-600">
          💰 {job.salary}
        </p>

        <h2 className="text-xl font-semibold mt-6">Job Description</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          {job.description}
        </p>

        {/* Apply Message */}
        {message && (
          <p className="mt-4 text-center text-blue-600 font-semibold">
            {message}
          </p>
        )}

        {/* Apply Button */}
        <button
          onClick={handleApply}
          disabled={applyLoading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {applyLoading ? "Applying..." : "Apply Now"}
        </button>

      </div>
    </div>
  );
};

export default JobDetails;
