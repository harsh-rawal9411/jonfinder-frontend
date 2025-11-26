import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔹 HERO SECTION */}
      <section className="text-center px-6 pt-16 pb-12 bg-white shadow-sm">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Explore thousands of job opportunities, apply instantly, and track your applications — all in one place.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Browse Jobs
          </Link>

          <Link
            to="/signup"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* 🔹 FEATURES SECTION */}
      <section className="px-6 py-14 max-w-6xl mx-auto">

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Designed for Everyone
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Job Seeker Card */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900">
              For Job Seekers
            </h3>
            <p className="mt-2 text-gray-600">
              Search jobs, apply in one click, and track your application status.
            </p>

            <ul className="mt-4 text-gray-700 space-y-2">
              <li>✔ Explore latest job listings</li>
              <li>✔ Apply with one click</li>
              <li>✔ Track all your applications</li>
            </ul>

            <Link
              to="/jobs"
              className="mt-4 inline-block text-blue-600 font-semibold underline"
            >
              Browse Jobs →
            </Link>
          </div>

          {/* Employer Card */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900">
              For Employers
            </h3>
            <p className="mt-2 text-gray-600">
              Post jobs, manage applications, and hire the right people faster.
            </p>

            <ul className="mt-4 text-gray-700 space-y-2">
              <li>✔ Create job postings</li>
              <li>✔ View and manage applications</li>
              <li>✔ Shortlist or reject candidates</li>
            </ul>

            <Link
              to="/signup"
              className="mt-4 inline-block text-blue-600 font-semibold underline"
            >
              Start Hiring →
            </Link>
          </div>

        </div>
      </section>

      {/* 🔹 FOOTER */}
      <footer className="text-center py-4 bg-white border-t">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} JobFinder. All rights reserved.
        </p>
      </footer>

    </div>
  );
};

export default Home;
