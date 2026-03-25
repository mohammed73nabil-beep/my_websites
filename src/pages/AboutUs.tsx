import React from 'react';
import { Sparkles, Target, Users, Shield, Zap } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-black min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-medium tracking-wider mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>من نحن</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
            نصنع التميز في <span className="text-amber-500">العالم الرقمي</span>
          </h1>
          <p className="text-xl text-slate-400 font-light leading-relaxed">
            نحن وكالة رقمية رائدة متخصصة في تقديم نماذج مواقع وتطبيقات فاخرة وجاهزة للاستخدام، مصممة لترتقي بالعلامات التجارية إلى آفاق جديدة.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-[#0a0a0a] border border-white/10 p-10 rounded-3xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] group-hover:bg-amber-500/10 transition-colors"></div>
            <Target className="w-12 h-12 text-amber-500 mb-6 relative z-10" />
            <h2 className="text-2xl font-bold text-white mb-4 relative z-10">رؤيتنا</h2>
            <p className="text-slate-400 font-light leading-relaxed relative z-10">
              أن نكون الوجهة الأولى للعلامات التجارية الراقية التي تبحث عن حضور رقمي استثنائي يعكس فخامتها، من خلال توفير حلول جاهزة تجمع بين التصميم المذهل والأداء الفائق.
            </p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 p-10 rounded-3xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] group-hover:bg-amber-500/10 transition-colors"></div>
            <Users className="w-12 h-12 text-amber-500 mb-6 relative z-10" />
            <h2 className="text-2xl font-bold text-white mb-4 relative z-10">مهمتنا</h2>
            <p className="text-slate-400 font-light leading-relaxed relative z-10">
              تمكين الشركات من إطلاق مشاريعها الرقمية بسرعة وكفاءة عالية، دون المساومة على الجودة أو الأناقة، عبر تقديم كتالوج حصري من النماذج القابلة للتخصيص بالكامل.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">قيمنا الأساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">الجودة الفائقة</h3>
              <p className="text-slate-400 font-light leading-relaxed">نهتم بأدق التفاصيل في التصميم والبرمجة لضمان منتج نهائي لا تشوبه شائبة.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">السرعة والإنجاز</h3>
              <p className="text-slate-400 font-light leading-relaxed">نقدر وقت عملائنا، لذا نوفر حلولاً جاهزة تختصر شهوراً من التطوير إلى أيام معدودة.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">الموثوقية والأمان</h3>
              <p className="text-slate-400 font-light leading-relaxed">نبني نماذجنا على أسس برمجية متينة تضمن أمان بياناتك واستقرار موقعك.</p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative rounded-[3rem] overflow-hidden h-[500px] border border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Our Office" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">فريق من المبدعين والخبراء</h2>
            <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
              نجمع بين أفضل المصممين والمطورين لابتكار تجارب رقمية تترك انطباعاً لا يُنسى.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
