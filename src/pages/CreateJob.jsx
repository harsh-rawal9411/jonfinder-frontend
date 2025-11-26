import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    companyName: "",        // ✅ add this
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await API.post("/jobs/create", form); // now includes companyName
      setMsg("Job created successfully!");
      setTimeout(() => navigate("/employer/dashboard"), 1000);
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || "Failed to create job");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-xl font-bold mb-4">Create New Job</h1>

        {msg && <p className="text-center mb-3 text-blue-600">{msg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Job Title"
            className="w-full p-3 border rounded"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            className="w-full p-3 border rounded"
            rows="4"
            onChange={handleChange}
            required
          ></textarea>

          <input
            name="salary"
            placeholder="Salary (e.g., 4-6 LPA)"
            className="w-full p-3 border rounded"
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            className="w-full p-3 border rounded"
            onChange={handleChange}
            required
          />

          {/* ✅ New field */}
          <input
            name="companyName"
            placeholder="Company Name"
            className="w-full p-3 border rounded"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
