import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles } from 'lucide-react';
import { useToast } from '../components/Toast';
import api from '../api';

export default function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/messages', formData);
      showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      showToast('حدث خطأ أثناء إرسال الرسالة', 'error');
    }
  };

  return (
    <div className="bg-black min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-medium tracking-wider mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>نحن هنا لمساعدتكم</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">تواصل <span className="text-amber-500">معنا</span></h1>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            لديك استفسار أو ترغب في بدء مشروعك الرقمي الجديد؟ فريقنا مستعد دائماً لتقديم الدعم والمشورة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="w-14 h-14 bg-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">البريد الإلكتروني</h3>
              <p className="text-slate-400 font-light mb-4">راسلنا في أي وقت وسنقوم بالرد عليك في غضون 24 ساعة.</p>
              <a href="mailto:contact@luxeweb.com" className="text-amber-500 font-bold hover:text-amber-400 transition-colors">contact@luxeweb.com</a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="w-14 h-14 bg-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">الهاتف</h3>
              <p className="text-slate-400 font-light mb-4">نحن متاحون للرد على اتصالاتكم من الأحد إلى الخميس.</p>
              <a href="tel:+966500000000" className="text-amber-500 font-bold hover:text-amber-400 transition-colors" dir="ltr">+967 781582995</a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="w-14 h-14 bg-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">المقر الرئيسي</h3>
              <p className="text-slate-400 font-light">الرياض، المملكة العربية السعودية<br />مركز الملك عبدالله المالي</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-4xl p-8 md:p-12 relative overflow-hidden backdrop-blur-md">
              {submitted ? (
                <div className="text-center py-20 animate-in fade-in zoom-in">
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">تم الإرسال بنجاح!</h3>
                  <p className="text-slate-400 text-lg font-light mb-10">شكراً لتواصلك معنا. سنقوم بمراجعة طلبك والرد عليك في أقرب وقت ممكن.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-10 py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-full font-bold transition-all"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-3">الاسم بالكامل</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="أدخل اسمك هنا"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-3">البريد الإلكتروني</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="example@mail.com"
                        dir="ltr"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-3">الموضوع</label>
                    <input 
                      type="text" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="كيف يمكننا مساعدتك؟"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-3">تفاصيل الرسالة</label>
                    <textarea 
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="اكتب رسالتك بالتفصيل هنا..."
                      className="w-full bg-white/5 border border-white/10 rounded-4xl py-4 px-6 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full md:w-auto px-12 py-5 bg-amber-500 hover:bg-amber-400 text-black rounded-full font-bold text-lg transition-all shadow-[0_0_40px_rgba(245,158,11,0.2)] hover:scale-105 flex items-center justify-center gap-3"
                  >
                    إرسال الرسالة
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-24 bg-linear-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-white/5 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center md:text-right">
            <h3 className="text-3xl font-black text-white mb-4">هل تبحث عن دعم فني مباشر؟</h3>
            <p className="text-slate-400 text-lg font-light">تواصل مع فريق الدعم الفني لدينا عبر الدردشة الحية للحصول على مساعدة سريعة بخصوص مشاريعك الجارية.</p>
          </div>
          <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold transition-all flex items-center gap-3 backdrop-blur-md">
            <MessageSquare className="w-6 h-6 text-amber-500" />
            فتح الدردشة المباشرة
          </button>
        </div>
      </div>
    </div>
  );
}
