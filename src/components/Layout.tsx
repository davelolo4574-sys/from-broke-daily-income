import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'motion/react';
import LeadPopup from './LeadPopup';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-16"
      >
        {children}
      </motion.main>
      <Footer />
      <LeadPopup />
    </div>
  );
};

export default Layout;
