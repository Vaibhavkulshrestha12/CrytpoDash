import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import CoinDetails from './pages/CoinDetails';
import Portfolio from './pages/Portfolio';
import NotFound from './pages/NotFound'; // Add a 404 page

// ProtectedRoute Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/auth" replace />;
};

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // Set up auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        setUser(session?.user ?? null);
      }
    });

    // Clean up the subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  return (
    <Router>
      <Routes>
        {/* Authentication Route */}
        <Route path="/auth" element={<Auth />} />

        {/* Main Layout with Nested Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <Portfolio />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback Route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
