import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, ShoppingBag, BookOpen, Info, Mail, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: TrendingUp },
    { name: 'Mga Produkto', path: '/shop', icon: ShoppingBag },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Ang Kwento', path: '/about', icon: Info },
    { name: 'Contact Us', path: '/contact', icon: Mail },
  ];

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-zinc-900">
              From Broke Into Daily Income
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-emerald-600",
                  location.pathname === link.path ? "text-emerald-600" : "text-zinc-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-600"
              title="Admin Dashboard"
            >
              <LayoutDashboard size={20} />
            </Link>
            <Link
              to="/shop/1"
              className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
            >
              Simulan na Kumita
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-600 hover:text-emerald-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium transition-colors",
                    location.pathname === link.path 
                      ? "bg-emerald-50 text-emerald-600" 
                      : "text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <link.icon size={20} />
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-4 px-3">
                <Link
                  to="/shop/1"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-md"
                >
                  Simulan na Kumita Ngayon
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
