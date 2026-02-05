import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl transition
   ${isActive ? "bg-blue-700 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`;

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 flex flex-col shadow-2xl">
        <div className="p-6 text-3xl tracking-wide border-b-2 border-blue-800 shadow">Admin Panel</div>

        <nav className="flex-1 p-4 space-y-2 text-white">
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            Dashboard Stats
          </NavLink>

          <NavLink to="/admin/users" className={navLinkClass}>
            Manage Users
          </NavLink>

          <NavLink to="/admin/stores" className={navLinkClass}>
            Manage Stores
          </NavLink>

          <NavLink to="/admin/password" className={navLinkClass}>
            Change Password
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition font"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
