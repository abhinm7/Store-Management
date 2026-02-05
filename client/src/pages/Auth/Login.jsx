import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosinstances";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });

      const { token, message, user } = response.data;
      const role = user.role;

      console.log(response.data);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", user.id);

      toast.success(message);

      // redirect based on Role
      if (role === "SYSTEM_ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "STORE_OWNER") {
        navigate("/owner/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Login Failed");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-sm border-2 border-blue-300">
        <h2 className="text-2xl font text-center text-gray-800 mb-6">Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-100 outline-none"
            />
          </div>
          <div>
            <input 
              type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-100 outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>

      <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                        Create an account&nbsp;
                        <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
    </div>
  );
};

export default Login;
