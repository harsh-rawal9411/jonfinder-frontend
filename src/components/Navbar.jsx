import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          JobFinder
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">

          {!token && (
            <>
              <Link to="/jobs" className="hover:text-blue-600">
                Jobs
              </Link>

              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Signup
              </Link>
            </>
          )}

          {token && user?.role === "jobseeker" && (
            <>
              <Link to="/jobs" className="hover:text-blue-600">
                Jobs
              </Link>

              <Link to="/dashboard" className="hover:text-blue-600">
                My Applications
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

          {token && user?.role === "employer" && (
            <>
              <Link to="/employer/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>

              <Link to="/employer/create-job" className="hover:text-blue-600">
                Create Job
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col gap-3">

          {!token && (
            <>
              <Link to="/jobs" onClick={() => setOpen(false)} className="p-2">
                Jobs
              </Link>

              <Link to="/login" onClick={() => setOpen(false)} className="p-2">
                Login
              </Link>
              
              <Link to="/signup" onClick={() => setOpen(false)} className="p-2">
                Signup
              </Link>
            </>
          )}

          {token && user?.role === "jobseeker" && (
            <>
              <Link to="/jobs" className="p-2" onClick={() => setOpen(false)}>
                Jobs
              </Link>

              <Link to="/dashboard" className="p-2" onClick={() => setOpen(false)}>
                My Applications
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 text-left text-red-500"
              >
                Logout
              </button>
            </>
          )}

          {token && user?.role === "employer" && (
            <>
              <Link to="/employer/dashboard" className="p-2" onClick={() => setOpen(false)}>
                Dashboard
              </Link>

              <Link to="/employer/create-job" className="p-2" onClick={() => setOpen(false)}>
                Create Job
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 text-left text-red-500"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
