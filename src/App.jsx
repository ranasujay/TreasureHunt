import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import Level from './pages/Level';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user } = useAuth();

  return (
    <div className="background-container">
      <Routes>
        <Route path="/" element={user ? <Navigate to={`/level/${user.currLevel}`} /> : <Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        
        {/* Protected Level Routes */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(level => (
          <Route
            key={level}
            path={`/level/${level}`}
            element={
              <ProtectedRoute requiredLevel={level}>
                <Level levelNumber={level} />
              </ProtectedRoute>
            }
          />
        ))}

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
