import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, DollarSign, MessageSquare, MoreVertical, TrendingUp, Users, Filter } from 'lucide-react';
import api from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from './DashboardLayout';

const chartData = [
  { name: 'يناير', sales: 4000 },
  { name: 'فبراير', sales: 3000 },
  { name: 'مارس', sales: 2000 },
  { name: 'أبريل', sales: 2780 },
  { name: 'مايو', sales: 1890 },
  { name: 'يونيو', sales: 2390 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    const fetchData = async () => {
      try {
        const [projectsRes, messagesRes] = await Promise.all([
          api.get('/projects'),
          api.get('/messages')
        ]);
        setProjects(projectsRes.data);
        setMessages(messagesRes.data);
      } catch (error: any) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <DashboardLayout>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="flex items-center gap-1 text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3" /> +12.5%
            </span>
          </div>
          <div className="text-slate-500 text-sm font-medium mb-1">إجمالي الأرباح</div>
          <div className="text-3xl font-black text-slate-900">$24,500</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
          </div>
          <div className="text-slate-500 text-sm font-medium mb-1">المواقع النشطة</div>
          <div className="text-3xl font-black text-slate-900">{projects.length}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="flex items-center gap-1 text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3" /> +4.2%
            </span>
          </div>
          <div className="text-slate-500 text-sm font-medium mb-1">رسائل التواصل</div>
          <div className="text-3xl font-black text-slate-900">{messages.length}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <span className="flex items-center gap-1 text-rose-600 text-sm font-bold bg-rose-50 px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3 rotate-180" /> -1.5%
            </span>
          </div>
          <div className="text-slate-500 text-sm font-medium mb-1">معدل التحويل</div>
          <div className="text-3xl font-black text-slate-900">2.4%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">المبيعات خلال 6 أشهر</h3>
          <div className="h-72" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="sales" fill="#004bca" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">أحدث الرسائل</h3>
            <Link to="/dashboard/messages" className="text-sm text-primary font-bold hover:underline">عرض الكل</Link>
          </div>
          <div className="space-y-4">
            {messages.slice(0, 4).map((msg, i) => (
              <div key={msg.id || i} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black shrink-0">
                  {msg.name?.charAt(0) || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{msg.name}</h4>
                    <span className="text-xs text-slate-400">اليوم</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{msg.subject}</p>
                </div>
              </div>
            ))}
            {messages.length === 0 && <p className="text-slate-500 text-sm py-4 text-center">لا توجد رسائل جديدة.</p>}
          </div>
        </div>
      </div>

      {/* Sites Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">مواقع معروضة للبيع</h3>
          <Link to="/dashboard/sites" className="text-sm text-primary font-bold hover:underline flex items-center gap-1">
            <Filter className="w-4 h-4" />
            الإدارة الكاملة
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-medium">
              <tr>
                <th className="px-6 py-4 font-medium">الموقع</th>
                <th className="px-6 py-4 font-medium">السعر</th>
                <th className="px-6 py-4 font-medium">الزيارات الشهرية</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.slice(0, 5).map((site, i) => (
                <tr key={site.id || i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden">
                        <img src={site.image || 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=100&h=100'} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-slate-900">{site.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">{site.price}</td>
                  <td className="px-6 py-4 text-slate-500">{site.visits}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${site.status === 'متاح' ? 'bg-emerald-100 text-emerald-700' : site.status === 'مباع' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-700'}`}>
                      {site.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <Link to="/dashboard/sites" className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors inline-flex">
                      <MoreVertical className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-400">لا توجد مواقع معروضة.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
