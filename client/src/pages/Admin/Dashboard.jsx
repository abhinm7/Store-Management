import { useEffect, useState } from "react";
import api from "../../api/axiosinstances";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalUsers: null,
    totalStores: null,
    totalRatings: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard-stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setStats({
          totalUsers: "-",
          totalStores: "-",
          totalRatings: "-",
        });
        toast.error("Failed to load stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-medium text-gray-800 mb-8">
        System Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="bg-white p-6 rounded-2xl shadow-lg border border-blue-500
                flex flex-col items-center justify-center"
        >
          <h2 className="text-gray-500 text-sm uppercase font-semibold">
            Total Users
          </h2>
          <div className="min-h-12">
          {stats.totalUsers === null ? (
            <Spinner />
          ) : (
            <p className="text-4xl font-bold min-h-10 text-gray-800 mt-2">
              {stats.totalUsers}
            </p>
          )}
          </div>
        </div>

        <div
          className="bg-white p-6 rounded-2xl shadow-lg border border-green-500
                flex flex-col items-center justify-center"
        >
          <h2 className="text-gray-500 text-sm uppercase font-semibold">
            Total Stores
          </h2>
          <div className="min-h-12">
          {stats.totalStores === null ? (
            <Spinner />
          ) : (
            <p className="text-4xl font-bold min-h-10 text-gray-800 mt-2">
              {stats.totalStores}
            </p>
          )}
          </div>
        </div>

        <div
          className="bg-white p-6 rounded-2xl shadow-lg border border-yellow-500
                flex flex-col items-center justify-center"
        >
          <h2 className="text-gray-500 text-sm uppercase font-semibold">
            Total Ratings
          </h2>
          <div className="min-h-12">
            {stats.totalRatings === null ? (
              <Spinner />
            ) : (
              <p className="text-4xl font-bold text-gray-800 mt-2">
                {stats.totalRatings}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
