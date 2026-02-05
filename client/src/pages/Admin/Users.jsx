import { useEffect, useState } from "react";
import api from "../../api/axiosInstances";
import { toast } from "react-hot-toast";
import AddUser from "../../components/AddUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("");
  const [search, setSearch] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);

  // fetch users
  const fetchUsers = async () => {
    try {
      let query = `/admin/users?`;
      if (filterRole) query += `role=${filterRole}&`;
      if (search) query += `name=${search}&`; // Simple search by name

      const res = await api.get(query);
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  // Re-fetch when filters change
  useEffect(() => {
    fetchUsers();
  }, [filterRole, search]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add User
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Roles</option>
          <option value="SYSTEM_ADMIN">Admin</option>
          <option value="STORE_OWNER">Store Owner</option>
          <option value="NORMAL_USER">User</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Email</th>
              <th className="p-4 font-semibold text-gray-700">Role</th>
              <th className="p-4 font-semibold text-gray-700">Address</th>
              <th className="p-4 font-semibold text-gray-700">Store Rating</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === "SYSTEM_ADMIN"
                          ? "bg-red-100 text-red-800"
                          : user.role === "STORE_OWNER"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{user.address}</td>
                  <td className="p-4 text-gray-800">
                    {user.rating ? `⭐ ${user.rating}` : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddUser
          onClose={() => setShowModal(false)}
          onSuccess={fetchUsers}
        />
      )}
    </div>
  );
};

export default Users;
