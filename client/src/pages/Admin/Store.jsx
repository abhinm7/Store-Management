import { useEffect, useState } from "react";
import api from "../../api/axiosinstances";
import { toast } from "react-hot-toast";
import AddStore from "../../components/AddStore";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchStores = async () => {
    try {
      const res = await api.get("/admin/stores");
      setStores(res.data);
    } catch {
      toast.error("Failed to fetch stores");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Stores</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Store
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Store Name</th>
              <th className="p-4">Address</th>
              <th className="p-4">Email</th>
              <th className="p-4">Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.length ? (
              stores.map((store) => (
                <tr key={store.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{store.name}</td>
                  <td className="p-4">{store.address}</td>
                  <td className="p-4">{store.email}</td>
                  <td className="p-4 text-yellow-600 font-bold">
                    {store.rating > 0 ? `⭐ ${store.rating}` : "No Ratings"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No stores found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddStore   
          onClose={() => setShowModal(false)}
          onSuccess={fetchStores}
        />
      )}
    </div>
  );
};

export default Stores;
