import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import { useAuth } from "./contexts/authContext/index";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111418]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return userLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
}

// Public Route Component
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { userLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111418]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return !userLoggedIn ? <>{children}</> : <Navigate to="/dashboard" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
