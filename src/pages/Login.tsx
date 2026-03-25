import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import api from '../api';
import { useToast } from '../components/Toast';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === 'login') {
        const response = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        showToast('تم تسجيل الدخول بنجاح', 'success');
        navigate('/dashboard');
      } else {
        showToast('طريقة التسجيل غير مدعومة حاليا، يرجى تواصل مع الإدارة', 'info');
      }
    } catch (error: any) {
      showToast(error.response?.data?.error || 'حدث خطأ في تسجيل الدخول', 'error');
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative">
        
        {/* Logo */}
        <div className="absolute top-8 right-8 sm:right-16 lg:right-24 xl:right-32">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-2xl leading-none">S</span>
            </div>
            <span className="font-black text-2xl text-slate-900 tracking-tight">SiteMarket</span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto mt-20 lg:mt-0">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 mb-3">مرحباً بك مجدداً 👋</h1>
            <p className="text-slate-500 text-lg">قم بتسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك.</p>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
            <button 
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('login')}
            >
              تسجيل الدخول
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('register')}
            >
              إنشاء حساب جديد
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    dir="ltr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-left"
                    required
                  />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-700">كلمة المرور</label>
                {activeTab === 'login' && (
                  <a href="#" className="text-sm font-bold text-primary hover:text-primary-hover transition-colors">نسيت كلمة المرور؟</a>
                )}
              </div>
              <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    dir="ltr"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-left font-sans"
                    required
                  />
                <button 
                  type="button"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {activeTab === 'login' && (
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-5 h-5 border-2 border-slate-300 rounded-md hover:border-primary transition-colors">
                  <input type="checkbox" id="remember" className="opacity-0 absolute inset-0 cursor-pointer peer" />
                  <div className="w-3 h-3 bg-primary rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <label htmlFor="remember" className="text-sm font-medium text-slate-600 cursor-pointer select-none">تذكرني في المرة القادمة</label>
              </div>
            )}

            <button type="submit" className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary/25">
              {activeTab === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500 font-medium">أو الدخول بواسطة</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 px-4 border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-colors font-bold text-slate-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-3 px-4 border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-colors font-bold text-slate-700">
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-slate-500">
              هل ترغب في بيع موقعك؟ <Link to="/register-seller" className="text-primary font-bold hover:underline">سجل كبائع الآن</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Marketing */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-lg text-center">
          <div className="w-20 h-20 bg-primary/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-8 border border-primary/30">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl font-black text-white mb-6 leading-tight">
            سوقك الأول لبيع وشراء المواقع الرقمية
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            انضم إلى أكثر من 50,000 مستخدم يثقون بمنصتنا لتحقيق أرباح من مشاريعهم الرقمية بأمان وسهولة.
          </p>
          
          <div className="grid grid-cols-2 gap-6 text-right">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-black text-emerald-400 mb-2">150%</div>
              <div className="text-slate-400 font-medium">نمو سنوي في المبيعات</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-black text-blue-400 mb-2">100%</div>
              <div className="text-slate-400 font-medium">نقل آمن للملكية</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
