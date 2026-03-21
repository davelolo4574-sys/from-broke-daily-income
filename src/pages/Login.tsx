import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TrendingUp, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const adminUser = (import.meta as any).env.VITE_ADMIN_USERNAME || 'admin';
    const adminPass = (import.meta as any).env.VITE_ADMIN_PASSWORD || 'admin123';

    if (username === adminUser && password === adminPass) {
      localStorage.setItem('admin_session', 'true');
      window.location.href = '/admin';
    } else {
      setError('Invalid username or password.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user is admin (in real app, check role in Firestore)
      if (result.user.email === 'davelolo4574@gmail.com') {
        navigate('/admin');
      } else {
        setError('Access denied. Wala kang admin privileges.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to login. Pakisubukang muli.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-black/5"
      >
        <div className="text-center mb-12 relative">
          <Link 
            to="/" 
            className="absolute -top-6 left-0 flex items-center space-x-2 text-zinc-400 hover:text-emerald-600 transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            <span>Back to website</span>
          </Link>
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
            <TrendingUp size={32} />
          </div>
          <h1 className="text-3xl font-black text-zinc-900 mb-2">Admin Login</h1>
          <p className="text-zinc-500 text-sm">Secure access para sa iyong business dashboard.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold mb-8 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>

        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-zinc-400">
            <span className="bg-white px-4">Or use Google</span>
          </div>
        </div>

        <div className="space-y-6">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-zinc-100 py-4 rounded-2xl font-bold text-zinc-700 hover:border-emerald-600 hover:bg-emerald-50 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                <span>Login with Google</span>
              </>
            )}
          </button>
          
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-zinc-400">
              <span className="bg-white px-4">Authorized Personnel Only</span>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-400 leading-relaxed">
            By logging in, you agree to our Terms of Service at Privacy Policy. Ang access ay monitored para sa security purposes.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
