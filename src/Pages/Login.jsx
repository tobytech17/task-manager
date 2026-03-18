import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../api";
export default function Login() {
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await API.post("/api/login", {
        identifier,
        password,
      });

      const data = res.data;
      //save token to local storage
      localStorage.setItem("token", data.token);
      toast.success("Login successful");

      setTimeout(() => {
        navigate("/tasks");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            placeholder="Username/Email"
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowHint(true)}
              onBlur={() => setShowHint(false)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

            {showHint && (
              <div className="absolute z-10 left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm text-gray-500 space-y-1">
                <p className="font-semibold text-gray-600 mb-1">
                  Password must contain:
                </p>
                <p>• At least one uppercase letter (A-Z)</p>
                <p>• At least one lowercase letter (a-z)</p>
                <p>• At least one number (0-9)</p>
                <p>• At least one special character (@.#$!%?&*)</p>
                <p>• Minimum 6 characters</p>
              </div>
            )}
          </div>

          <button className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition">
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?
          <Link to="/register" className="text-purple-600 ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
