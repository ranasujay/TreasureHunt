import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.login(formData.name, formData.password);
      if (response.success) {
        login(response.user);
        navigate(`/level/${response.user.currLevel || response.user.level}`);
      } else {
        toast.error(response.message || 'Invalid credentials');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="background-container flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md glass p-6 md:p-8 animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4 md:mb-6">
          🏆 Treasure Hunt
        </h2>
        <p className="text-gray-300 text-center mb-6 md:mb-8 text-sm md:text-base">
          Login to continue your adventure
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Team Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm md:text-base"
              placeholder="Enter your team name"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm md:text-base"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 md:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 btn-hover disabled:opacity-50 text-sm md:text-base font-medium"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 md:mt-6 text-center">
          <Link to="/leaderboard" className="block text-gray-200 hover:text-white text-sm md:text-base font-medium">
            View Leaderboard
          </Link>
          <p className="text-gray-300 text-xs md:text-sm mt-4">
            Contact admin to register your team
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
