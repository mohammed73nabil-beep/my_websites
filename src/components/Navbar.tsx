import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Moon, Sun, Languages } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme, language, setLanguage } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="shrink-0 flex items-center gap-2 group">
              <div className="w-10 h-10 bg-linear-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.7)] transition-all">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="font-black text-2xl tracking-wider text-white">Luxe<span className="text-amber-500">Web</span></span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              <Link to="/" className={`text-sm font-medium transition-colors hover:text-amber-400 ${location.pathname === '/' ? 'text-amber-500' : 'text-slate-300'}`}>
                الرئيسية
              </Link>
              <Link to="/marketplace" className={`text-sm font-medium transition-colors hover:text-amber-400 ${location.pathname === '/marketplace' ? 'text-amber-500' : 'text-slate-300'}`}>
                 أنواع المواقع
              </Link>
              <Link to="/about" className={`text-sm font-medium transition-colors hover:text-amber-400 ${location.pathname === '/about' ? 'text-amber-500' : 'text-slate-300'}`}>
                من نحن
              </Link>
              <Link to="/contact" className={`text-sm font-medium transition-colors hover:text-amber-400 ${location.pathname === '/contact' ? 'text-amber-500' : 'text-slate-300'}`}>
                تواصل معنا
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 transition-all"
                title={theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 transition-all flex items-center gap-2 px-3"
              >
                <Languages className="w-4 h-4" />
                <span className="text-xs font-bold">{language === 'ar' ? 'EN' : 'AR'}</span>
              </button>
            </div>
            
            <Link to="/contact" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all backdrop-blur-sm hover:border-amber-500/50 hover:text-amber-400">
              اطلب موقعك
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 py-4 px-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-xl text-base font-medium ${location.pathname === '/' ? 'bg-amber-500/10 text-amber-500' : 'text-slate-300 hover:bg-white/5'}`}>
            الرئيسية
          </Link>
          <Link to="/marketplace" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-xl text-base font-medium ${location.pathname === '/marketplace' ? 'bg-amber-500/10 text-amber-500' : 'text-slate-300 hover:bg-white/5'}`}>
            النماذج الفاخرة
          </Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-xl text-base font-medium ${location.pathname === '/about' ? 'bg-amber-500/10 text-amber-500' : 'text-slate-300 hover:bg-white/5'}`}>
            من نحن
          </Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-xl text-base font-medium ${location.pathname === '/contact' ? 'bg-amber-500/10 text-amber-500' : 'text-slate-300 hover:bg-white/5'}`}>
            تواصل معنا
          </Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-center mt-4 bg-linear-to-r from-amber-500 to-amber-600 text-black px-4 py-3 rounded-xl font-bold">
            اطلب موقعك الآن
          </Link>
        </div>
      )}
    </nav>
  );
}
