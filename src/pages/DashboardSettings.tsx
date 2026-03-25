import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Bell, Shield, Eye, EyeOff } from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import { useToast } from '../components/Toast';

export default function DashboardSettings() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // For now save to localStorage as placeholder
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      localStorage.setItem('user', JSON.stringify({ ...user, name }));
    }
    showToast('تم حفظ الإعدادات بنجاح', 'success');
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-black text-slate-900 mb-6">الإعدادات</h2>

      <div className="max-w-2xl space-y-6">
        {/* Profile Info */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">معلومات الحساب</h3>
          </div>
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  disabled
                  dir="ltr"
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 outline-none cursor-not-allowed"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1.5">لا يمكن تعديل البريد الإلكتروني</p>
            </div>
            <button type="submit" className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-colors shadow-lg shadow-primary/20">
              حفظ التغييرات
            </button>
          </form>
        </div>

        {/* Password */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">تغيير كلمة المرور</h3>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); showToast('تم تحديث كلمة المرور (وظيفة تجريبية)', 'info'); }} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">كلمة المرور الجديدة</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="8 أحرف على الأقل"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-bold transition-colors">
              تحديث كلمة المرور
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">الإشعارات</h3>
          </div>
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <p className="font-bold text-slate-900">إشعارات الرسائل الجديدة</p>
              <p className="text-sm text-slate-500 mt-0.5">استقبال إشعار عند وصول رسالة جديدة</p>
            </div>
            <div
              onClick={() => { setNotifications(!notifications); showToast(notifications ? 'تم إيقاف الإشعارات' : 'تم تفعيل الإشعارات', 'info'); }}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${notifications ? 'bg-primary' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${notifications ? 'translate-x-1' : 'translate-x-7'}`} />
            </div>
          </label>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">الأمان</h3>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="text-sm text-emerald-700 font-medium">حسابك محمي بتوكن تسجيل دخول آمن (JWT)</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
