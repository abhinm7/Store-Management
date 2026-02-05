import { useEffect, useState } from 'react';
import api from '../../api/axiosinstances';
import { toast } from 'react-hot-toast';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null); 
  const [ratingValue, setRatingValue] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // fetch stores
  const fetchStores = async () => {
    try {
      const res = await api.get('/user/stores'); 
      setStores(res.data);
    } catch (err) {
      toast.error("Failed to load stores");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const openRatingModal = (store) => {
    setSelectedStore(store);
    setRatingValue(0);
    setShowModal(true);
  };

  // submit rating
  const handleSubmitRating = async () => {
    try {
      await api.post('/user/submit-rating', {
        storeId: selectedStore.id,
        value: parseInt(ratingValue)
      });
      
      toast.success(`Rated ${selectedStore.name} successfully!`);
      setShowModal(false);
      fetchStores(); // refresh to see updated average
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to submit rating");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Rate a Store</h1>
      <p className="text-gray-500 mb-8">Share your experience and help others!</p>

      {/* STORE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div key={store.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">
                ⭐ {store.rating || 'New'}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{store.address}</p>
            
            <button 
              onClick={() => openRatingModal(store)}
              className="w-full bg-blue-50 text-blue-600 font-semibold py-2 rounded hover:bg-blue-600 hover:text-white transition"
            >
              Submit Rating
            </button>
          </div>
        ))}
      </div>

      {/* RATING MODAL */}
      {showModal && selectedStore && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-sm text-center shadow-2xl">
            <h2 className="text-2xl font-bold mb-2">Rate {selectedStore.name}</h2>
            <p className="text-gray-500 mb-6">How was your experience?</p>

            {/* STAR SELECTOR */}
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingValue(star)}
                  className={`text-4xl transition transform hover:scale-110 ${
                    star <= ratingValue ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitRating}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;