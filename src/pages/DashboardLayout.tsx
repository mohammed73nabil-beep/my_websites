import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Globe, DollarSign, MessageSquare, Settings, Plus, LogOut, Bell, Search } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('المدير');
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setUserName(JSON.parse(userStr).name);
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'لوحة التحكم', exact: true },
    { to: '/dashboard/sites', icon: <Globe className="w-5 h-5" />, label: 'مواقعي', exact: false },
    { to: '/dashboard/messages', icon: <MessageSquare className="w-5 h-5" />, label: 'الرسائل', exact: false },
    { to: '/dashboard/settings', icon: <Settings className="w-5 h-5" />, label: 'الإعدادات', exact: false },
  ];

  const isActive = (to: string, exact: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-slate-200 hidden lg:flex flex-col">
        <div className="p-6">
          <Link to="/dashboard/sites" className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-primary/20">
            <Plus className="w-5 h-5" />
            إضافة موقع جديد
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive(link.to, link.exact)
                  ? 'bg-slate-50 text-primary font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Top bar */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-black text-slate-900">مرحباً {userName} 👋</h1>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="بحث..."
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none w-56"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              <button className="relative p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
