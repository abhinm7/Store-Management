import { useEffect, useState } from "react";
import api from "../api/axiosinstances";
import { toast } from "react-hot-toast";

const AddStore = ({ onClose, onSuccess }) => {
  const [owners, setOwners] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await api.get("/admin/users?role=STORE_OWNER");
        setOwners(res.data);
      } catch {
        toast.error("Failed to load store owners");
      }
    };
    fetchOwners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ownerId) {
      return toast.error("Please select a Store Owner");
    }

    try {
      await api.post("/admin/store", formData);
      toast.success("Store created successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create store");
    }
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-xl mb-4">Add New Store</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Store Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border-b p-2"
          />

          <input
            placeholder="Store Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border-b p-2"
          />

          <textarea
            placeholder="Address"
            required
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full border-b p-2"
          />

          <select
            value={formData.ownerId}
            onChange={(e) =>
              setFormData({ ...formData, ownerId: e.target.value })
            }
            required
            className="w-full border-b p-2"
          >
            <option value="">-- Select Store Owner --</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name} ({owner.email})
              </option>
            ))}
          </select>

          {owners.length === 0 && (
            <p className="text-xs text-red-500">
              No Store Owners found. Create a Store Owner first.
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Store
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStore;
