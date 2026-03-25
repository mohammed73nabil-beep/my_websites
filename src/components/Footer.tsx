import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-linear-to-br from-amber-400 to-amber-600 rounded-xl shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="font-black text-2xl tracking-wider text-white">Luxe<span className="text-amber-500">Web</span></span>
            </Link>
            <p className="text-slate-400 font-light leading-relaxed max-w-md mb-8">
              وجهتك الأولى للنماذج الرقمية الفاخرة. نقدم لك مواقع وتطبيقات جاهزة مصممة بأعلى معايير الجودة لتعكس رقي علامتك التجارية.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500/50 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500/50 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500/50 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6">روابط سريعة</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-400 hover:text-amber-500 transition-colors font-light">الرئيسية</Link></li>
              <li><Link to="/marketplace" className="text-slate-400 hover:text-amber-500 transition-colors font-light">النماذج الفاخرة</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-amber-500 transition-colors font-light">من نحن</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-amber-500 transition-colors font-light">تواصل معنا</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="text-slate-400 font-light">الرياض، المملكة العربية السعودية</li>
              <li><a href="mailto:contact@luxeweb.com" className="text-amber-500 hover:text-amber-400 transition-colors font-light">contact@luxeweb.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-light">
            © {new Date().getFullYear()} LuxeWeb. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-white transition-colors font-light">الشروط والأحكام</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors font-light">سياسة الخصوصية</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
