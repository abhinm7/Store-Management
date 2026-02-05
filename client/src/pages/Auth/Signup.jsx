import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axiosinstances";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "hhh",
    email: "ssss",
    password: "sssss",
    address: "sssss",
    role: "NORMAL",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signup", formData);
      const { token, message, user } = response.data;
      const role = user.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", user.id);
      
      toast.success(message);

      // redirect based on Role
      navigate("/user/dashboard");

      toast.success("Account created! Welcome ",user.name);

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Signup Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-md border-2 border-blue-300"
      >
        <h2 className="text-2xl text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {/* NAME */}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-100 outline-none"
            placeholder="Full name"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-100 outline-none"
            placeholder="Email"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-100 outline-none"
            placeholder="Password"
          />
        </div>

        {/* ADDRESS */}
        <div className="mb-6">
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-100 outline-none"
            placeholder="Address"
            rows="2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
