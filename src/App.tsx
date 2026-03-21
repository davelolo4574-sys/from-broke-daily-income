import React, { Component, ErrorInfo, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import EBookView from './pages/EBookView';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import { testConnection } from './services/firestore';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testConnection();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isAdmin = user?.email === 'davelolo4574@gmail.com' || localStorage.getItem('admin_session') === 'true';

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/shop" element={<Layout><Shop /></Layout>} />
        <Route path="/shop/:productId" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/checkout/:productId" element={<Checkout />} />
        <Route path="/my-ebook/:orderId" element={<EBookView />} />
        
        {/* Admin Routes */}
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin/*" 
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" replace />} 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
