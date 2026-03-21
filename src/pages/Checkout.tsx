import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Lock,
  Smartphone,
  Upload,
  Download,
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  X
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createDocument } from '../services/firestore';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Kailangan ang iyong buong pangalan'),
  email: z.string().email('Hindi valid ang email address'),
  phone: z.string().min(10, 'Kailangan ng valid na phone number'),
  referenceNumber: z.string().min(8, 'Kailangan ng valid na GCash Reference Number'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);
  const [orderId, setOrderId] = React.useState<string | null>(null);
  const [downloadTriggered, setDownloadTriggered] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [proofImage, setProofImage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Mock product data
  const product = {
    id: productId,
    title: productId === '1' ? 'From Broke Into Daily Income' : 'Freelance Mastery PH',
    price: productId === '1' ? 297 : 1999,
    downloadUrl: 'https://drive.google.com/uc?export=download&id=19SezbXCFNJrK3BDb4JxxoXFi9NzrLj8B' // Placeholder PDF
  };

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<CheckoutFormValues>();

  const handleNext = async () => {
    const isValid = await trigger(['name', 'email', 'phone']);
    if (isValid) setStep(2);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!proofImage) {
      setError('Pakisend ang screenshot ng iyong payment proof.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      // Submit to Firestore
      const newOrderId = await createDocument('orders', {
        customerEmail: data.email,
        customerName: data.name,
        customerPhone: data.phone,
        productId: productId || 'unknown',
        amount: product.price,
        status: 'verifying',
        paymentMethod: 'gcash',
        referenceNumber: data.referenceNumber,
        proofOfPayment: proofImage,
        createdAt: new Date().toISOString()
      });

      setOrderId(newOrderId);

      // Submit to Formspree
      await fetch('https://formspree.io/f/xojkbzbv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formType: 'Checkout',
          ...data,
          productTitle: product.title,
          amount: product.price,
          paymentMethod: 'gcash',
          proofOfPayment: 'Image uploaded to Firestore'
        })
      });
      
      // Simulate verification process
      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
        // Auto-verify after 1.5 seconds for demo purposes
        setTimeout(() => setIsVerified(true), 1500);
      }, 1500);
    } catch (err) {
      console.error('Checkout error:', err);
      setError('May mali sa pag-process ng iyong order. Pakisubukang muli.');
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(() => {
    if (isVerified && product.downloadUrl && !downloadTriggered) {
      setDownloadTriggered(true);
      // Trigger download
      const link = document.createElement('a');
      link.href = product.downloadUrl;
      link.setAttribute('download', `${product.title}.pdf`);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [isVerified, product.downloadUrl, product.title, downloadTriggered]);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white p-8 lg:p-12 rounded-[3rem] shadow-2xl text-center border border-black/5"
        >
          <AnimatePresence mode="wait">
            {!isVerified ? (
              <motion.div 
                key="verifying"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mx-auto animate-pulse">
                  <ShieldCheck size={40} />
                </div>
                <h2 className="text-3xl font-black text-zinc-900">Verifying Payment...</h2>
                <p className="text-zinc-500 leading-relaxed">
                  Salamat! Natanggap na namin ang iyong payment proof. Ang aming team ay kasalukuyang vine-verify ang iyong transaction. 
                  <br /><span className="text-sm font-bold text-emerald-600 mt-2 block">Mangyaring huwag i-close ang page na ito.</span>
                </p>
                {orderId && (
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-left">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Order ID (Save this)</p>
                    <p className="text-xs font-mono text-zinc-600 break-all">{orderId}</p>
                  </div>
                )}
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="h-full bg-emerald-600"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="verified"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 size={56} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-zinc-900 mb-2">Payment Verified!</h2>
                  <p className="text-zinc-500">Handa na ang iyong copy ng <strong>{product.title}</strong>.</p>
                  {downloadTriggered && (
                    <p className="text-emerald-600 text-sm font-bold mt-2 animate-bounce">
                      Ang iyong PDF download ay nagsisimula na...
                    </p>
                  )}
                </div>
                
                <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                  <p className="text-emerald-900 font-bold mb-6">Maaari mo nang basahin o i-download ang iyong eBook sa ibaba:</p>
                  <Link 
                    to={`/my-ebook/${orderId}`}
                    className="flex items-center justify-center space-x-3 w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200"
                  >
                    <BookOpen size={24} />
                    <span>Read eBook Online</span>
                  </Link>
                </div>

                <div className="pt-4">
                  <Link 
                    to="/"
                    className="text-zinc-400 font-bold hover:text-zinc-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Home</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen py-12 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center space-x-2 text-zinc-500 hover:text-emerald-600 font-bold mb-12 transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Shop</span>
        </Link>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-xl border border-black/5">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black text-zinc-900">Checkout</h2>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-emerald-600' : 'bg-zinc-200'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-emerald-600' : 'bg-zinc-200'}`}></div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {step === 1 ? (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-zinc-900 mb-6">Step 1: Personal Information</h3>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Full Name</label>
                      <input 
                        {...register('name')}
                        className={`w-full px-6 py-4 bg-zinc-50 border ${errors.name ? 'border-red-500' : 'border-zinc-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all`}
                        placeholder="Juan Dela Cruz"
                      />
                      {errors.name && <p className="text-xs text-red-500 px-1">{errors.name.message}</p>}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Email Address</label>
                        <input 
                          {...register('email')}
                          className={`w-full px-6 py-4 bg-zinc-50 border ${errors.email ? 'border-red-500' : 'border-zinc-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all`}
                          placeholder="juan@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 px-1">{errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Phone Number</label>
                        <input 
                          {...register('phone')}
                          className={`w-full px-6 py-4 bg-zinc-50 border ${errors.phone ? 'border-red-500' : 'border-zinc-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all`}
                          placeholder="09XXXXXXXXX"
                        />
                        {errors.phone && <p className="text-xs text-red-500 px-1">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
                    >
                      Proceed to Payment
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-zinc-900">Step 2: GCash Payment</h3>
                      <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-emerald-600 hover:underline">Edit Details</button>
                    </div>

                    <div className="bg-blue-600 text-white p-8 rounded-3xl relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex items-center space-x-2 mb-6">
                          <Smartphone size={24} />
                          <span className="font-black text-xl italic">GCash</span>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-blue-200 text-xs uppercase font-bold tracking-widest mb-1">Account Name</p>
                            <p className="text-2xl font-black uppercase">CH******N DA*E L.</p>
                          </div>
                          <div className="flex items-center justify-between bg-blue-700/50 p-4 rounded-2xl">
                            <div>
                              <p className="text-blue-200 text-xs uppercase font-bold tracking-widest mb-1">Account Number</p>
                              <p className="text-2xl font-black tracking-wider">0946 500 7753</p>
                            </div>
                            <button 
                              type="button"
                              onClick={() => copyToClipboard('09465007753')}
                              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
                            >
                              {copied ? <Check size={20} /> : <Copy size={20} />}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="space-y-6">
                      {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold flex items-center space-x-2">
                          <X size={16} />
                          <span>{error}</span>
                        </div>
                      )}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">GCash Reference Number</label>
                        <input 
                          {...register('referenceNumber')}
                          className={`w-full px-6 py-4 bg-zinc-50 border ${errors.referenceNumber ? 'border-red-500' : 'border-zinc-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all`}
                          placeholder="13-digit Reference Number"
                        />
                        {errors.referenceNumber && <p className="text-xs text-red-500 px-1">{errors.referenceNumber.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-1">Upload Proof of Payment (Screenshot)</label>
                        <div className="relative">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="proof-upload"
                          />
                          <label 
                            htmlFor="proof-upload"
                            className={`w-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-3xl cursor-pointer transition-all ${
                              proofImage ? 'border-emerald-600 bg-emerald-50' : 'border-zinc-200 hover:border-emerald-600 hover:bg-zinc-50'
                            }`}
                          >
                            {proofImage ? (
                              <div className="flex items-center space-x-3 text-emerald-600">
                                <CheckCircle2 size={24} />
                                <span className="font-bold">Screenshot Uploaded!</span>
                              </div>
                            ) : (
                              <>
                                <Upload size={32} className="text-zinc-400 mb-2" />
                                <span className="font-bold text-zinc-600">Click to upload screenshot</span>
                                <span className="text-xs text-zinc-400">PNG, JPG up to 5MB</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <ShieldCheck size={20} />
                          <span>Submit for Verification</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
                
                <p className="text-center text-xs text-zinc-400 flex items-center justify-center space-x-1">
                  <Lock size={12} />
                  <span>Secure Payment Processing</span>
                </p>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 text-white p-8 lg:p-12 rounded-[3rem] shadow-xl sticky top-24">
              <h3 className="text-2xl font-black mb-8">Order Summary</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{product.title}</h4>
                    <p className="text-zinc-400 text-sm">Digital Access (PDF)</p>
                  </div>
                  <span className="font-bold">₱{product.price.toLocaleString()}</span>
                </div>
                
                <div className="h-px bg-zinc-800"></div>
                
                <div className="flex justify-between text-zinc-400 text-sm">
                  <span>Subtotal</span>
                  <span>₱{product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-sm">
                  <span>Transaction Fee</span>
                  <span className="text-emerald-500">LIBRE</span>
                </div>
                
                <div className="h-px bg-zinc-800"></div>
                
                <div className="flex justify-between items-center text-xl font-black">
                  <span>Total</span>
                  <span className="text-emerald-500">₱{product.price.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="bg-zinc-800/50 p-6 rounded-2xl space-y-4">
                <div className="flex items-start space-x-3 text-xs text-zinc-400">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>Instant download pagkatapos ma-verify ang iyong payment.</span>
                </div>
                <div className="flex items-start space-x-3 text-xs text-zinc-400">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>Siguraduhin na tama ang Reference Number para sa mabilis na verification.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
