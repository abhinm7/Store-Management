import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const UserLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("See you later!");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600 tracking-wide">
          RateMyStore
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/user/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Stores
          </Link>
          <Link to="/user/password" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Change Password
          </Link>
          <button 
            onClick={handleLogout}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-red-50 hover:text-red-600 transition"
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

export default UserLayout;