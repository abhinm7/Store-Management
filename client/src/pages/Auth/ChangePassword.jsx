import { useState } from 'react';
import api from '../../api/axiosInstances';
import { toast } from 'react-hot-toast';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("New passwords do not match!");
    }
    if (passwords.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      await api.post('/auth/update-password', {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      });

      toast.success("Password updated successfully!");
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });

    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update password");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl text-gray-800 mb-6">Change Password</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-gray-700 font-medium mb-1">Current Password</label>
          <input 
            type="password" name="oldPassword"
            value={passwords.oldPassword} onChange={handleChange} required 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">New Password</label>
          <input 
            type="password" name="newPassword"
            value={passwords.newPassword} onChange={handleChange} required 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Min 6 chars"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
          <input 
            type="password" name="confirmPassword"
            value={passwords.confirmPassword} onChange={handleChange} required 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;