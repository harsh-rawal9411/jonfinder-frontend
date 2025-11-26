import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditJob = () => {
  const { id } = useParams(); // job ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Fetch existing job details
  const fetchJobDetails = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      const job = res.data.job || res.data;

      setForm({
        title: job.title,
        description: job.description,
        salary: job.salary,
        location: job.location,
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update job
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    try {
      await API.put(`/jobs/${id}`, form);
      setMsg("Job updated successfully!");
      setTimeout(() => navigate("/employer/dashboard"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to update job");
    }

    setSaving(false);
  };

  if (loading) {
    return <p className="text-center mt-12">Loading job details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        
        <h1 className="text-xl font-bold mb-4">Edit Job</h1>

        {msg && <p className="text-blue-600 mb-3 text-center">{msg}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            rows="4"
            required
          ></textarea>

          <input
            name="salary"
            placeholder="Salary (e.g., 5-7 LPA)"
            value={form.salary}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition disabled:bg-gray-400"
          >
            {saving ? "Updating..." : "Update Job"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditJob;
