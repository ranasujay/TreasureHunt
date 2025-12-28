import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredLevel }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.currLevel < requiredLevel) {
    return <Navigate to={`/level/${user.currLevel}`} />;
  }

  return children;
};

export default ProtectedRoute;
