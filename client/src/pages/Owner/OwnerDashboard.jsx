import { useEffect, useState } from 'react';
import api from '../../api/axiosinstances';
import { toast } from 'react-hot-toast';
import Spinner from '../../components/Spinner';

const OwnerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/owner/dashboard');
        setData(res.data);
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="flex justify-center"><Spinner/></div>;

  if (!data) return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold text-gray-700">No Store Found</h2>
      <p className="text-gray-500">Contact an Admin to assign a store to your account.</p>
    </div>
  );

  return (
    <div>
      {/* HEADER STATS */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{data.storeName}</h1>
        <p className="text-gray-500">{data.address}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card 1: Average Rating */}
        <div className="bg-white p-6 rounded-lg shadow border border-indigo-500 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-sm uppercase font-semibold">Average Rating</h2>
            <p className="text-4xl font-bold text-gray-800 mt-2">{data.averageRating} <span className="text-lg text-yellow-500">★</span></p>
          </div>
        </div>

        {/* Card 2: Total Ratings */}
        <div className="bg-white p-6 rounded-lg shadow border border-pink-500">
          <h2 className="text-gray-500 text-sm uppercase font-semibold">Total Reviews</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">{data.totalRatings}</p>
        </div>
      </div>

      {/* RATINGS TABLE */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Customer Name</th>
              <th className="p-4 font-semibold text-gray-700">Email</th>
              <th className="p-4 font-semibold text-gray-700">Rating Given</th>
            </tr>
          </thead>
          <tbody>
            {data.ratings && data.ratings.length > 0 ? (
              data.ratings.map((rating, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{rating.user}</td>
                  <td className="p-4 text-gray-600">{rating.email}</td>
                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold">
                      {rating.rating} ★
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">No reviews yet. Time to market your store!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerDashboard;