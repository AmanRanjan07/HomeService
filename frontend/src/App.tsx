import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Navbar from './components/Navbar';
import ServerStatusBar from './components/ServerStatusBar';
import OfflineBanner from './components/OfflineBanner';

// User Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import ServiceProviderDashboard from './pages/ServiceProviderDashboard';
import CustomerDashboard from './pages/CustomerDashboard';

// Auth Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Router config for future flags
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router {...routerConfig}>
          <ServerStatusBar />
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected User Routes */}
            <Route path="/booking" element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute requiredRole="admin">
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="providers" element={<ServiceProviderDashboard />} />
                  <Route path="customers" element={<CustomerDashboard />} />
                </Routes>
              </ProtectedRoute>
            } />
          </Routes>
          <OfflineBanner />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 