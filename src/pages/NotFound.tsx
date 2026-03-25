import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px]"></div>

      <div className="max-w-md w-full text-center relative z-10">
        <div className="mb-8 relative inline-block">
          <Ghost className="w-24 h-24 text-amber-500 mx-auto animate-bounce" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-black text-black text-xl">
            ?
          </div>
        </div>
        
        <h1 className="text-8xl font-black text-white mb-4 tracking-tighter">404</h1>
        <h2 className="text-3xl font-bold text-amber-500 mb-6">عذراً، الصفحة غير موجودة</h2>
        <p className="text-slate-400 text-lg mb-12 leading-relaxed">
          يبدو أن الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله لمكان آخر. دعنا نعدك للمسار الصحيح.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-full font-bold transition-all flex items-center justify-center gap-2 group"
          >
            <Home className="w-5 h-5" />
            العودة للرئيسية
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            الرجوع للخلف
          </button>
        </div>
      </div>
    </div>
  );
}
