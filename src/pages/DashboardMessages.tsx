import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Clock, CheckCircle, Inbox } from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import api from '../api';
import { useToast } from '../components/Toast';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    api.get('/messages')
      .then(res => setMessages(res.data))
      .catch(() => showToast('حدث خطأ في جلب الرسائل', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-black text-slate-900 mb-6">الرسائل الواردة</h2>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 h-24 animate-pulse" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
          <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-500 mb-2">لا توجد رسائل</h3>
          <p className="text-slate-400">ستظهر هنا الرسائل الواردة من زوار الموقع</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                onClick={() => setSelected(msg)}
                className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-md ${
                  selected?.id === msg.id ? 'border-primary shadow-md shadow-primary/10' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-lg shrink-0">
                    {msg.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <p className="font-bold text-slate-900 text-sm truncate">{msg.name}</p>
                      <span className="text-xs text-slate-400 shrink-0 mr-2">{formatDate(msg.created_at)}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-700 truncate">{msg.subject}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 h-full">
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-2xl shrink-0">
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{selected.name}</h3>
                    <a href={`mailto:${selected.email}`} className="text-primary text-sm font-medium hover:underline flex items-center gap-1 mt-1">
                      <Mail className="w-3.5 h-3.5" />
                      {selected.email}
                    </a>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDate(selected.created_at)}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-1">الموضوع</h4>
                  <p className="font-bold text-slate-900 text-lg">{selected.subject}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-2">الرسالة</h4>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl">{selected.message}</p>
                </div>
                <div className="mt-6">
                  <a
                    href={`mailto:${selected.email}?subject=رد: ${selected.subject}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
                  >
                    <Mail className="w-4 h-4" />
                    الرد على الرسالة
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">اختر رسالة لعرض تفاصيلها</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
