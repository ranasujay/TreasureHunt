import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { leaderboardAPI } from '../utils/api';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
    // Auto refresh every 5 seconds for real-time updates
    const interval = setInterval(() => {
      fetchLeaderboard(true); // Silent refresh
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async (silent = false) => {
    if (!silent) setLoading(true);
    
    try {
      const response = await leaderboardAPI.getLeaderboard();
      if (response.success) {
        setUsers(response.users);
        setLastUpdated(new Date());
      }
    } catch (error) {
      // Silently fail - user can retry with refresh button
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const getTimeAgo = () => {
    const seconds = Math.floor((new Date() - lastUpdated) / 1000);
    if (seconds < 10) return 'Just now';
    if (seconds < 60) return `${seconds}s ago`;
    return 'Recently';
  };

  return (
    <div className="background-container min-h-screen p-4 md:p-8">
      <button
        onClick={() => navigate(-1)}
        className="text-white bg-gray-700 hover:bg-gray-600 py-1.5 md:py-2 px-3 md:px-4 text-sm md:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150 absolute top-3 md:top-4 left-3 md:left-4"
      >
        ← Back
      </button>

      <div className="absolute top-3 md:top-4 right-3 md:right-4 text-white bg-gray-700 py-1.5 md:py-2 px-3 md:px-4 rounded-md text-xs md:text-base">
        Total Teams: {users.length}
      </div>

      <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-4 md:mb-6 pt-16 md:pt-12">
        🏅 Leaderboard
      </h1>

      {/* Real-time update indicator */}
      <div className="text-center mb-4 md:mb-6">
        <div className="inline-flex items-center space-x-2 bg-gray-800 bg-opacity-50 px-4 py-2 rounded-full">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-green-400 text-xs md:text-sm font-medium">
            Live • Updated {getTimeAgo()}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-white text-lg md:text-xl">Loading...</div>
      ) : (
        <div className="max-w-4xl mx-auto overflow-x-auto animate-fade-in px-4">
          <table className="w-full bg-gray-800 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-base">Rank</th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-base">Team Name</th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-base">Current Level</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`text-white border-t border-gray-700 hover:bg-gray-700 transition ${
                    index === 0 ? 'bg-yellow-900 bg-opacity-20' : 
                    index === 1 ? 'bg-gray-600 bg-opacity-20' : 
                    index === 2 ? 'bg-orange-900 bg-opacity-20' : ''
                  }`}
                >
                  <td className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base">
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && index + 1}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4 font-semibold text-sm md:text-base">{user.name}</td>
                  <td className="py-2 md:py-3 px-2 md:px-4">
                    <span className="bg-indigo-600 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm">
                      Level {user.currLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
