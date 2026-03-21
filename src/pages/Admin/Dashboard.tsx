import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  Plus,
  Search,
  MoreVertical,
  TrendingUp,
  DollarSign,
  UserPlus,
  FileText,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle,
  Clock,
  X,
  BookOpen
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { getCollection, deleteDocument, createDocument, updateDocument } from '../../services/firestore';
import { Product, BlogPost, Lead, Order } from '../../types';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import ProductModal from '../../components/Admin/ProductModal';
import BlogPostModal from '../../components/Admin/BlogPostModal';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('overview');
  const [products, setProducts] = React.useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>([]);
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isBlogPostModalOpen, setIsBlogPostModalOpen] = React.useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = React.useState<BlogPost | null>(null);

  const [isProofModalOpen, setIsProofModalOpen] = React.useState(false);
  const [selectedProof, setSelectedProof] = React.useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = React.useState<{ collection: string, id: string } | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [p, b, l, o] = await Promise.all([
        getCollection<Product>('products'),
        getCollection<BlogPost>('blogPosts'),
        getCollection<Lead>('leads'),
        getCollection<Order>('orders')
      ]);
      setProducts(p);
      setBlogPosts(b);
      setLeads(l);
      setOrders(o);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('admin_session');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDelete = async (collection: string, id: string) => {
    setDeleteConfirm({ collection, id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteDocument(deleteConfirm.collection, deleteConfirm.id);
      setDeleteConfirm(null);
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete item.');
    }
  };

  const handleVerify = async (id: string) => {
    try {
      await updateDocument('orders', id, { status: 'completed' });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'completed' } : o));
    } catch (error) {
      console.error('Verify error:', error);
    }
  };

  const stats = [
    { label: 'Total Revenue', value: `₱${orders.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`, icon: DollarSign, color: 'bg-emerald-500' },
    { label: 'Total Leads', value: leads.length, icon: UserPlus, color: 'bg-blue-500' },
    { label: 'Active Products', value: products.length, icon: ShoppingBag, color: 'bg-purple-500' },
    { label: 'Conversion Rate', value: '4.2%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-zinc-400 flex flex-col fixed h-full z-50">
        <div className="p-6 flex items-center space-x-3 text-white">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <TrendingUp size={18} />
          </div>
          <span className="font-bold text-sm tracking-tight">Admin Console</span>
        </div>
        
        <nav className="flex-grow px-4 space-y-2 mt-6">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'products', label: 'Products', icon: ShoppingBag },
            { id: 'blog', label: 'Blog Posts', icon: BookOpen },
            { id: 'leads', label: 'Leads', icon: Users },
            { id: 'orders', label: 'Orders', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-6 border-t border-zinc-800">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 text-sm hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-8 lg:p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 capitalize">{activeTab}</h1>
            <p className="text-zinc-500 text-sm">Manage your business operations and content.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            {(activeTab === 'products' || activeTab === 'blog') && (
              <button 
                onClick={() => {
                  if (activeTab === 'products') {
                    setSelectedProduct(null);
                    setIsProductModalOpen(true);
                  } else {
                    setSelectedBlogPost(null);
                    setIsBlogPostModalOpen(true);
                  }
                }}
                className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>Add New</span>
              </button>
            )}
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm"
                >
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-black text-zinc-900">{stat.value}</h3>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-black/5 flex justify-between items-center">
                  <h3 className="font-bold text-zinc-900">Recent Leads</h3>
                  <button className="text-xs font-bold text-emerald-600 hover:underline">View All</button>
                </div>
                <div className="divide-y divide-black/5">
                  {leads.slice(0, 5).map((lead) => (
                    <div key={lead.id} className="p-4 flex justify-between items-center hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
                          <Users size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900">{lead.name || 'Anonymous'}</p>
                          <p className="text-xs text-zinc-500">{lead.email}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                  {leads.length === 0 && <div className="p-8 text-center text-zinc-400 text-sm">No leads yet.</div>}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-black/5 flex justify-between items-center">
                  <h3 className="font-bold text-zinc-900">Recent Orders</h3>
                  <button className="text-xs font-bold text-emerald-600 hover:underline">View All</button>
                </div>
                <div className="divide-y divide-black/5">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="p-4 flex justify-between items-center hover:bg-zinc-50 transition-colors">
                      <div>
                        <p className="text-sm font-bold text-zinc-900">₱{order.amount.toLocaleString()}</p>
                        <p className="text-xs text-zinc-500">{order.customerEmail}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${
                        order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                  {orders.length === 0 && <div className="p-8 text-center text-zinc-400 text-sm">No orders yet.</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-black/5">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={product.imageUrl} className="w-10 h-10 rounded-lg object-cover" alt="" referrerPolicy="no-referrer" />
                        <span className="text-sm font-bold text-zinc-900">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-bold text-zinc-900">₱{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${
                        product.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsProductModalOpen(true);
                          }}
                          className="p-2 text-zinc-400 hover:text-emerald-600 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete('products', product.id)}
                          className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 text-sm">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-black/5">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Post</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Author</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {blogPosts.map(post => (
                  <tr key={post.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={post.imageUrl} className="w-10 h-10 rounded-lg object-cover" alt="" referrerPolicy="no-referrer" />
                        <span className="text-sm font-bold text-zinc-900">{post.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{post.category}</td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{post.author}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${
                        post.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedBlogPost(post);
                            setIsBlogPostModalOpen(true);
                          }}
                          className="p-2 text-zinc-400 hover:text-emerald-600 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete('blogPosts', post.id)}
                          className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {blogPosts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 text-sm">No blog posts found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-black/5">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Email</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Source</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-zinc-900">{lead.name || 'Anonymous'}</td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{lead.email}</td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{lead.source}</td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete('leads', lead.id)}
                        className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 text-sm">No leads found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-black/5">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">GCash Ref</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Proof</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-zinc-900">{order.customerName || 'Anonymous'}</p>
                      <p className="text-xs text-zinc-500">{order.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-zinc-900">₱{order.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-mono text-zinc-500">{(order as any).referenceNumber || 'N/A'}</td>
                    <td className="px-6 py-4">
                      {(order as any).proofOfPayment ? (
                        <button 
                          onClick={() => {
                            setSelectedProof((order as any).proofOfPayment);
                            setIsProofModalOpen(true);
                          }}
                          className="text-emerald-600 hover:text-emerald-700 font-bold text-xs flex items-center space-x-1"
                        >
                          <ExternalLink size={12} />
                          <span>View Proof</span>
                        </button>
                      ) : (
                        <span className="text-zinc-400 text-xs italic">No proof</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${
                        order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                        order.status === 'verifying' ? 'bg-orange-100 text-orange-700' :
                        'bg-zinc-100 text-zinc-500'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        {order.status === 'completed' && (
                          <Link 
                            to={`/my-ebook/${order.id}`}
                            target="_blank"
                            className="p-2 text-zinc-400 hover:text-emerald-600 transition-all"
                            title="View eBook"
                          >
                            <BookOpen size={16} />
                          </Link>
                        )}
                        {order.status === 'verifying' && (
                          <button 
                            onClick={() => handleVerify(order.id)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            title="Verify Payment"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete('orders', order.id)}
                          className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-400 text-sm">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-zinc-900">Site Configuration</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Site Name</label>
                  <input type="text" defaultValue="From Broke To Daily Income" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Support Email</label>
                  <input type="email" defaultValue="support@frombroke.com" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Brand Primary Color</label>
                  <div className="flex items-center space-x-4">
                    <input type="color" defaultValue="#059669" className="w-12 h-12 rounded-lg border-none cursor-pointer" />
                    <span className="text-sm font-mono text-zinc-500">#059669</span>
                  </div>
                </div>
              </div>
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all">
                Save Changes
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-zinc-900">Admin Access</h3>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">davelolo4574@gmail.com</p>
                    <p className="text-xs text-zinc-500">Primary Administrator</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-1 rounded-full">Active</span>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <ProductModal 
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          product={selectedProduct}
          onSuccess={fetchData}
        />
        <BlogPostModal 
          isOpen={isBlogPostModalOpen}
          onClose={() => setIsBlogPostModalOpen(false)}
          post={selectedBlogPost}
          onSuccess={fetchData}
        />

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDeleteConfirm(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white p-8 rounded-3xl max-w-sm w-full shadow-2xl text-center space-y-6"
              >
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                  <Trash2 size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-zinc-900">Sigurado ka ba?</h3>
                  <p className="text-zinc-500 text-sm">Hindi na mababawi ang item na ito kapag binura mo.</p>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 py-3 bg-zinc-100 text-zinc-600 rounded-xl font-bold hover:bg-zinc-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 z-[120] bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3"
            >
              <X size={20} />
              <span className="font-bold text-sm">{error}</span>
              <button onClick={() => setError(null)} className="ml-4 opacity-70 hover:opacity-100">
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Proof Modal */}
        <AnimatePresence>
          {isProofModalOpen && selectedProof && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsProofModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-white p-4 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
              >
                <div className="flex justify-between items-center mb-4 px-2">
                  <h3 className="font-bold text-zinc-900">Payment Proof</h3>
                  <button onClick={() => setIsProofModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                    <Trash2 size={20} />
                  </button>
                </div>
                <img 
                  src={selectedProof} 
                  className="w-full h-auto rounded-2xl shadow-inner border border-zinc-100" 
                  alt="Proof of Payment" 
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
