import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const result = await register(formData.name, formData.password);
    setIsLoading(false);

    if (result.success) {
      toast.success(`Team "${formData.name}" registered successfully!`);
      // Clear form for next registration
      setFormData({ name: '', password: '', confirmPassword: '' });
    } else {
      toast.error(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="background-container flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md glass p-6 md:p-8 animate-fade-in">
        <div className="bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg p-3 mb-4">
          <p className="text-yellow-200 text-xs md:text-sm text-center">
            🔒 Admin Only - Team Registration
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
          📝 Register Team
        </h2>
        <p className="text-gray-300 text-center mb-6 md:mb-8 text-sm md:text-base">Create a new team account</p>

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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm md:text-base"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 md:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 btn-hover disabled:opacity-50 text-sm md:text-base font-medium"
          >
            {isLoading ? 'Creating Account...' : 'Register Team'}
          </button>
        </form>

        <div className="mt-4 md:mt-6 text-center space-y-2 md:space-y-3">
          <Link to="/leaderboard" className="block text-gray-200 hover:text-white text-sm md:text-base font-medium">
            📊 View Leaderboard
          </Link>
          <Link to="/" className="block text-indigo-400 hover:text-indigo-300 text-sm md:text-base">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
