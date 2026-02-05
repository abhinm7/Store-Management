import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const OwnerLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-indigo-600 tracking-wide">
          Store Owner Portal
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/owner/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium transition">
            My Dashboard
          </Link>
          <Link to="/owner/password" className="text-gray-600 hover:text-indigo-600 font-medium transition">
            Change Password
          </Link>
          <button 
            onClick={handleLogout}
            className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded hover:bg-red-50 hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-8 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;