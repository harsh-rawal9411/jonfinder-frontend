import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    console.log("Login component rendered");

    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        console.log("LOGIN BUTTON CLICKED");

        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            })

            localStorage.setItem("token", res.data.token);
            login(res.data.user, res.data.token);

            if (res.data.user.role === "employer") {
                navigate("/employer/dashboard")
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
                  setError(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false)
        }
    };

    return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-4">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to continue
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Create one
          </a>
        </p>

      </div>
    </div>
    )
}

export default Login;
